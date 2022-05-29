import jwt from 'jsonwebtoken';
import sql from '../../src/db';

const getAccounts = async (login : string) => {
	const accounts = await sql`
		select * from account
		where login = ${login};
	`;

	return accounts;
}

const getAccountInfo = async (usertype : number, userid : number) => {
	if (usertype === 0 || usertype === 1) {
		const accountInfo = await sql`
			select fullname, email from teacher
			where id = ${userid};
		`;
		return accountInfo[0];
	}
}

const SECRET_KEY = '3sG&Z-J5T3LE$?vRGy#*+6?hu#@aKZD9tR2L^A?2AR-gmSDDaHW_?5Uzdur_^FtPe88+42jy&tYvGU*7hZ%@7-AaBJ3n!YFt&v*CMTUd+LueWM-aUW5EWSF$En*Ypz8H';

export default async function(req, res) {

	if (req.body.length) {
		/**
		 * if body is not empty
		 */
		const jbody = JSON.parse(req.body);

		if (jbody.jwt) {
			/**
			 * if body contains jwt
			 */
			try {
				const decoded = jwt.verify(jbody.jwt, SECRET_KEY);
				res.status(200).json(decoded);
			} catch(err) {
				res.status(401).json({text: 'Not valid JWT', err: err});
			}
		} else if (jbody.login && jbody.password) {
			/**
			 * if body contains credentials - login and password
			 */
			const accounts = await getAccounts(jbody.login);

			if (accounts.length === 0) {
				/**
				 * if no account found
				 */
				 res.status(404).json({text: 'Account doesn\'t exist'});
			} else {
				/**
				 * if account has been found
				 */
				if (jbody.password !== accounts[0].password) {
					/**
					 * if wrong password
					 */
					res.status(400).json({text: 'Wrong password'});
				} else {
					const accountInfo = await getAccountInfo(accounts[0].usertype, accounts[0].userid);

					const token = jwt.sign({
						login: jbody.login,
						userid: accounts[0].userid,
						usertype: accounts[0].usertype,
						...accountInfo
					}, SECRET_KEY);

					res.status(200).json({
						jwt: token,
						login: jbody.login,
						userid: accounts[0].userid,
						usertype: accounts[0].usertype,
						...accountInfo
					});
				}
			}
		} else {
			/**
			 * if body contains something else
			 */
			res.status(401).json({text: 'Need credentials or jwt'});
		}
	} else {
		/**
		 * if body is empty
		 */
		res.status(400).json({text: 'Zero body. Need credentials or jwt'});
	}

}

export const jwtcheck = (token : string) : boolean => {
	try {
		jwt.verify(token, SECRET_KEY);
		return true;
	} catch (err) {
		return false;
	}
}