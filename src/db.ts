import { Client } from 'pg';

const client = new Client({
	host: 'localhost',
	port: 5432,
	database: 'esrsp_db',
	user: 'esrsp',
	password: ';mJ]y!86#WTAUVZ2;@2f6>!h'
});
client.connect();

export default client;