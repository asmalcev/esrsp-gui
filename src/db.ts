import postgres from 'postgres';

const sql = postgres({
	host: '192.168.1.197',
	port: 5432,
	database: 'esrsp_db',
	username: 'esrsp',
	password: ';mJ]y!86#WTAUVZ2;@2f6>!h'
});

export default sql;