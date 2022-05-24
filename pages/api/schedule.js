import sql from '../../src/db';
import { groupBy } from '../../src/utils';

const getSchedule = async (id) => {
	const schedule = await sql`
	select
		D.name as name,
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
	where teacherid = ${id}
	order by C.classday, C.classnumber;
	`;

	const classnumberTimes = [
		{
			timeStart: '9:00',
			timeEnd: '10:30',
		},
		{
			timeStart: '10:50',
			timeEnd: '12:20',
		},
		{
			timeStart: '12:40',
			timeEnd: '14:10',
		},
		{
			timeStart: '14:55',
			timeEnd: '16:25',
		},
		{
			timeStart: '16:45',
			timeEnd: '18:15',
		}
	]

	const scheduleGuiVersion = schedule.map(v => ({
		members: v.groups,

		...v,
		...classnumberTimes[v.classnumber - 1]
	}));

	const grouped = groupBy(scheduleGuiVersion, 'classday');

	const keys = Object.keys(grouped);
	const values = Object.values(grouped)
	return values.map((v, i) => ({order: Number(keys[i]), lessons: v}));
}

export default async (req, res) => {
	const result = await getSchedule(3);

	res.status(200).json(result);
}