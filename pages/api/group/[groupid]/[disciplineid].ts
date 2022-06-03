import client from '../../../../src/db';
import { isOddWeek, getddmm } from '../../../../src/utils';
import { jwtcheck } from '../../auth';

const getGroup = async groupid => {
	const group = await client.query(`
		select * from student
		where studentgroupid = ${groupid}
		order by fullname;
	`).catch(err => console.log(err));

	return group.rows;
}

const getGroupDisciplineNames = async (groupid, disciplineid) => {
	const names = await client.query(`
		select
			SG.name as name,
			D.name as discipline
		from studentgroup as SG, discipline as D
		where SG.id = ${groupid} and D.id = ${disciplineid};
	`).catch(err => console.log(err));

	return names.rows;
}

const getGroupDisciplineClassDays = async (groupid, disciplineid) => {
	const classdays = await client.query(`
		select classday from class
		where
			disciplineid = ${disciplineid} and
			flowid in (
				select id from flow
				where studentgroupid = ${groupid}
			);
	`).catch(err => console.log(err));

	return classdays.rows;
}

const classDaysToDates = classdays => {
	const BEGIN = new Date('02.07.2022');
	const _isOddWeek = isOddWeek(BEGIN);
	const currentDayInOrder = BEGIN.getDay() + (_isOddWeek ? 0 : 7);
	BEGIN.setDate(BEGIN.getDate() - currentDayInOrder + 1);

	const dates = [];

	let classdayIndex = 0;
	let lastClassday = 1;
	const END = new Date('06.23.2022');
	while (BEGIN < END) {
		if (
			lastClassday > classdays[classdayIndex].classday
		) {
			BEGIN.setDate(BEGIN.getDate() + (classdays[classdayIndex].classday - lastClassday + 14));
		} else {
			BEGIN.setDate(BEGIN.getDate() + (classdays[classdayIndex].classday - lastClassday));
		}
		dates.push(getddmm(BEGIN));
		lastClassday = classdays[classdayIndex].classday;

		classdayIndex = (classdayIndex + 1) % classdays.length;
	}

	return dates;
}

const getGroupAcademicPerfomance = async (groupid, disciplineid) => {
	const result = await client.query(`
		select APD.date, APD.academicperformance, S.id as studentid from academicperformancedate as APD
		join academicperformance as AP on APD.academicperformanceid = AP.id
		join student as S on S.id = AP.studentid
		where academicperformanceid in (
			select id from academicperformance
			where disciplineid = ${disciplineid} and studentid in (
				select id from student
				where studentgroupid = ${groupid}
			)
		);
	`);

	return result.rows.map(
		row => ({
			...row,
			date: getddmm(row.date)
		})
	);
}

export default async (req, res) => {
	if (req.method !== 'POST') {
		res.status(400).json({text: 'Only POST method'});
		return;
	}
	const jbody = jwtcheck(req.body);
	if (!jbody) {
		res.status(401).json({text: 'Wrong JWT or it was not provided'});
		return;
	}

	const { groupid, disciplineid } = req.query;

	const group = await getGroup(groupid);

	const [{ name, discipline }] = await getGroupDisciplineNames(groupid, disciplineid);

	const classdays = await getGroupDisciplineClassDays(groupid, disciplineid);
	const classdates = classDaysToDates(classdays);

	const groupAP = await getGroupAcademicPerfomance(groupid, disciplineid);

	const groupRows = group.map(person => [
		person.fullname.split(' ').slice(0, 2).join(' '),
		...Array.from(
			{length: classdates.length},
			() => ``
		)
	]);

	groupAP.forEach(ap => {
		const rowIndex = group.findIndex(student => student.id === ap.studentid);
		const columnIndex = classdates.indexOf(ap.date);
		groupRows[rowIndex][columnIndex + 1] = ap.academicperformance;
	});

	const response = {
		name: name,
		discipline: discipline,
		table: {
			columnsRow: [name, ...classdates],
			rows: groupRows
		},
		rawGroup: group
	};

	res.status(200).json(response);
}