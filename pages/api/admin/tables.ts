import logger from "../../../services/logger";
import { jwtcheck } from "../auth";

export default async function(req, res) {
	logger.info({
		url: req.url,
		method: req.method,
	});

	if (req.method !== 'POST') {
		res.status(400).json({text: 'Only POST method'});
		return;
	}

	const jbody = jwtcheck(req.body);

	if (!jbody) {
		res.status(401).json({text: 'Need JWT for access'});
		return;
	}

	if (jbody['jwt']?.usertype !== 1) {
		res.status(403).json({text: 'Forbidden'});
		return;
	}

	res.status(200).json({
		text: 'hi'
	});
}