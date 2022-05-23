import sql from '../../src/db';
import { groupBy } from '../../src/utils';

const getSchedule = async () => {
	const schedule = await sql`
	select
		D.name as discipline,
		T.fullname as teacher,
		(
			select STRING_AGG(SG.name, ', ') from studentgroup as SG
			where id in (
				select studentgroupid from flow
				where id = C.flowid
			)
		) as groups,
		C.place,
		C.classday,
		C.classnumber
	from class as C
	join discipline as D on D.id = C.disciplineid
	join teacher as T on T.id = C.teacherid
	where teacherid = 1
	order by C.classday, C.classnumber;
	`;
	return groupBy(schedule, 'classday');
}

export default async function(req, res) {
	const result = await getSchedule();

	res.status(200).json(result);
}