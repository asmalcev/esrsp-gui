const SERVER_PORT = process.env['SERVER_PORT'] || 3000;
const SERVER_HOST = process.env['ESRSP_PROD'] ? 'backend' : 'localhost';

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/api/:slug*',
				destination: `http://${SERVER_HOST}:${SERVER_PORT}/:slug*`,
				basePath: false,
			}
		]
	},
}