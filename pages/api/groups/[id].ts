import logger from '../../../services/logger';
import client from '../../../src/db';
import { jwtcheck } from '../auth';

const getGroups = async id => {
	const groups = await client.query(`
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
	`).catch(err => console.log(err));

	return groups.rows;
}

export default async (req, res) => {
	logger.info({
		url: req.url,
		method: req.method,
	});

	if (req.method !== 'POST') {
		res.status(400).json({text: 'Only POST method'});
		return;
	}
	const jbody = jwtcheck(req.body);
	if (!jbody) {
		res.status(401).json({text: 'Wrong JWT or it was not provided'});
		return;
	}

	const { id } = req.query;
	const response = await getGroups(id);

	res.status(200).json(response);
}