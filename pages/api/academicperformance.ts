import logger from '../../services/logger';
import client from '../../services/db';
import { groupBy } from '../../src/utils';
import { jwtcheck } from './auth';

interface Mark {
	studentid: number;
	value: string;
	date: string;
}

const addAcademicPerformance = async (marks : Array<Mark>, disciplineid : number) => {
	const queryRequest = `
		insert into academicperformancedate(
			academicperformanceid,
			date,
			academicperformance
		) values ${ marks.map(mark =>
		`(
			(
				select id from academicperformance
				where disciplineid = ${ disciplineid } and studentid = ${ mark.studentid }
			),
			'${ mark.date }',
			'${ mark.value }'
		)`).join(',')};
	`;

	client.query(queryRequest).catch(err => console.log(err));
}

const updateAcademicPerformace = async (marks : Array<Mark>, disciplineid : number) => {
	const queryRequest = marks.map(mark => `
		update academicperformancedate
		set academicperformance = '${ mark.value }'
		where academicperformanceid = (
			select id from academicperformance
			where disciplineid = ${ disciplineid } and studentid = ${ mark.studentid }
		) and date = '${ mark.date }';
	`).join('\n');

	client.query(queryRequest).catch(err => console.log(err));
}

const deleteAcademicPerformance = async (marks : Array<Mark>, disciplineid : number) => {
	const queryRequest = marks.map(mark => `
		delete from academicperformancedate
		where date = '${ mark.date }' and academicperformanceid = (
			select id from academicperformance
			where disciplineid = ${ disciplineid } and studentid = ${ mark.studentid }
		);
	`).join('\n');

	client.query(queryRequest).catch(err => console.log(err));
}

export default async function(req, res) {
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
		res.status(401).json({test: 'Need JWT for access'});
		return;
	}

	if (!jbody['data'] || !jbody['disciplineid']) {
		res.status(400).json({test: 'Need marks data and discipline id'});
		return;
	}

	const grouped = groupBy(jbody['data'], 'method');

	const disciplineid = Number(jbody['disciplineid']);

	if (grouped.insert) {
		addAcademicPerformance(grouped.insert, disciplineid);
	}
	if (grouped.update) {
		updateAcademicPerformace(grouped.update, disciplineid);
	}
	if (grouped.delete) {
		deleteAcademicPerformance(grouped.delete, disciplineid);
	}

	res.status(200).json({test: 'test'});
}