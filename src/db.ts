import postgres from 'postgres';

const sql = postgres({
	host: '192.168.1.197',
	port: 5432,
	database: 'esrsp_db',
	username: 'esrsp_user',
	password: 'TbVd69ba79ySWqDY'
});

export default sql;