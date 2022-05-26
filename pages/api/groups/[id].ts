import sql from '../../../src/db';

const getGroups = async id => {
	const groups = sql`
		select distinct
			D.name as discipline,
			D.id as disciplineid,
			SG.name as groupname,
			SG.id as groupid
		from class as C
		join discipline as D on D.id = C.disciplineid
		right join flow as F on F.id = C.flowid
		join studentgroup as SG on F.studentgroupid = SG.id
		where teacherid = ${id}
		order by SG.id, D.id;
	`;

	return groups;
}

export default async (req, res) => {
	const { id } = req.query;
	const response = await getGroups(id);

	res.status(200).json(response);
}