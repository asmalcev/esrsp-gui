import client from '../../src/db';
import { jwtcheck } from './auth';

interface Mark {
	studentid: number;
	value: string;
	date: string;
}

const addAcademicPerfomance = async (marks : Array<Mark>, disciplineid : number) => {
	const queryRequest = `
		insert into academicperformancedate(
			academicperformanceid,
			date,
			academicperformance
		) values ${marks.map(mark =>
		`(
			(
				select id from academicperformance
				where disciplineid = ${disciplineid} and studentid = ${mark.studentid}
			),
			'${ mark.date }',
			'${ mark.value }'
		)`).join(',')};
	`;

	client.query(queryRequest).catch(err => console.log(err));
}

export default async function(req, res) {
	const jbody = jwtcheck(req.body);

	if (!jbody) {
		res.status(401).json({test: 'Need JWT for access'});
		return;
	}

	if (!jbody['data'] || !jbody['disciplineid']) {
		res.status(400).json({test: 'Need marks data and discipline id'});
		return;
	}

	addAcademicPerfomance(jbody['data'], Number(jbody['disciplineid']));

	res.status(200).json({test: 'test'});
}