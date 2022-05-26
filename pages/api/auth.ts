import jwt from 'jsonwebtoken';

const SECRET_KEY = '3sG&Z-J5T3LE$?vRGy#*+6?hu#@aKZD9tR2L^A?2AR-gmSDDaHW_?5Uzdur_^FtPe88+42jy&tYvGU*7hZ%@7-AaBJ3n!YFt&v*CMTUd+LueWM-aUW5EWSF$En*Ypz8H';

export default async function(req, res) {

	if (req.body.length) {
		const jbody = JSON.parse(req.body);

		if (jbody.jwt) {
			try {
				const decoded = jwt.verify(jbody.jwt, SECRET_KEY);
				res.status(200).json(decoded);
			} catch(err) {
				res.status(401).json({text: 'Not valid JWT'});
			}
		} else if (jbody.login && jbody.password) {
			const token = jwt.sign({
				login: jbody.login,
				password: jbody.password
			}, SECRET_KEY);

			res.status(200).json({jwt: token});
		}

		res.status(401).json({text: 'Need credentials or jwt'});
	} else {
		res.status(400).json({text: 'Zero body. Need credentials or jwt'});
	}

}

	// const hash = jwt.sign({ foo: 'bar' }, SECRET_KEY);
	// const obj = jwt.verify(hash, SECRET_KEY);

	// res.status(200).json();