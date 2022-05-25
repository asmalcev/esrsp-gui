import sql from '../../src/db';

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

export default async function(req, res) {
	const group = await getGroup(1);
	const [{ name, discipline }] = await getGroupDisciplineNames(1, 1);
	const classdays = await getGroupDisciplineClassDays(1, 1);

	const response = { group, name, discipline, classdays };

	res.status(200).json(response);
	// res.status(200).json({test: 'test'});
}