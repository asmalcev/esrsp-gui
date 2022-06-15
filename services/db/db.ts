import { Client } from 'pg';

const client = new Client({
	host: 'localhost',
	port: 5432,
	database: process.env['DB'],
	user: process.env['DB_USER'],
	password: process.env['DB_PASSWORD']
});
client.connect();

export default client;
