import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log({
	database: process.env['DB'],
	user: process.env['DB_USER'],
	password: process.env['DB_PASSWORD']
});

const client = new Client({
	host: 'localhost',
	port: 5432,
	database: process.env['DB'],
	user: process.env['DB_USER'],
	password: process.env['DB_PASSWORD']
});
client.connect();

export default client;
