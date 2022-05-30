import sql from '../../../../src/db';
import { isOddWeek, getddmm } from '../../../../src/utils';

const getGroup = async groupid => {
	const group = sql`
		select * from student
		where studentgroupid = ${groupid}
		order by fullname;
	`;

	return group;
}

const getGroupDisciplineNames = async (groupid, disciplineid) => {
	const names = sql`
		select
			SG.name as name,
			D.name as discipline
		from studentgroup as SG, discipline as D
		where SG.id = ${groupid} and D.id = ${disciplineid};
	`;

	return names;
}

const getGroupDisciplineClassDays = async (groupid, disciplineid) => {
	const classdays = sql`
		select classday from class
		where
			disciplineid = ${disciplineid} and
			flowid in (
				select id from flow
				where studentgroupid = ${groupid}
			);
	`;

	return classdays;
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

export default async (req, res) => {
	const { groupid, disciplineid } = req.query;
	const group = await getGroup(groupid);
	const [{ name, discipline }] = await getGroupDisciplineNames(groupid, disciplineid);
	const classdays = await getGroupDisciplineClassDays(groupid, disciplineid);
	const classdates = classDaysToDates(classdays);

	const response = {
		name: name,
		discipline: discipline,
		table: {
			columnsRow: [name, ...classdates],
			rows: group.map(person => [
				person.fullname.split(' ').slice(0, 2).join(' '),
				...Array.from(
					{length: classdates.length},
					() => ``
				)
			])
		},
		rawGroup: group
	};

	res.status(200).json(response);
}