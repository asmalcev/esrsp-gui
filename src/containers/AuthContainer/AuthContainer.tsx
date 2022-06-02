import { useRouter } from 'next/router';

import {
	useState,
	useEffect,
} from 'react';

import { useApp, localStorageKeys } from '../../../pages/_app';
import AuthForm from '../../components/AuthForm';

import { jwtfetch } from '../../utils';


const AuthContainer = () => {
	const router = useRouter();

	const appContext = useApp();

	const [loading, setLoading] = useState<boolean>(true);

	/**
	 * on mount useEffect
	 */
	useEffect(() => {

		const checkJWT = async () => {
			/**
			 * if localStorage stores jwt => then check if it valid
			 */
			const jwt = window.localStorage[localStorageKeys.jwt];
			if (jwt !== undefined) {
				const resp = await jwtfetch('/api/auth');
	
				if (resp.status === 200) {
					const data = await resp.json();
					appContext.updateUser({
						id: data.userid,
						email: data.email,
						name: data.fullname,
						login: data.login,
						usertype: data.usertype === 1 ? 'admin' : 'teacher',
						loggedin: true
					});
				} else {
					setLoading(false);
				}
			} else {
				setLoading(false);
			}
		}

		checkJWT();
	}, []);


	/**
	 * handlers
	 */
	const formSubmitHandler = async (formData, setErr) => {
		const resp = await fetch('/api/auth', {
			method: 'POST',
			body: JSON.stringify(formData)
		});

		if (resp.status === 200) {
			/**
			 * All is ok
			 */
			const data = await resp.json();

			window.localStorage[localStorageKeys.jwt] = data.jwt;
			appContext.updateUser({
				id: data.userid,
				email: data.email,
				name: data.fullname,
				login: data.login,
				usertype: data.usertype === 1 ? 'admin' : 'teacher',
				loggedin: true
			});
			router.push('/');
		} else if (resp.status === 404) {
			/**
			 * Account not found
			 */
			setErr('Аккаунта с таким логином не существует');
		} else if (resp.status === 400) {
			/**
			 * Wrong password
			 */
			setErr('Неверный пароль');
		}
	}

	return <>
		<AuthForm
			loading={loading}
			formSubmitHandler={formSubmitHandler}
			/>
	</>;
}

export default AuthContainer;