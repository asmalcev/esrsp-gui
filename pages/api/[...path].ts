import { createProxyMiddleware } from 'http-proxy-middleware';

const SERVER_HOST = process.env['ESRSP_PROD'] ? 'backend' : 'localhost';
const SERVER_PORT = process.env['SERVER_PORT'] || 3000;

export default createProxyMiddleware({
	target: `http://${SERVER_HOST}:${SERVER_PORT}`,
	changeOrigin: true,
	pathRewrite: {
		'^/api': '',
	},
});

export const config = {
	api: {
		externalResolver: true,
		bodyParser: false,
	},
}