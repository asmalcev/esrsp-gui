/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/api/:slug*',
				destination: 'http://localhost:3000/:slug*',
				basePath: false,
			}
		]
	},
}