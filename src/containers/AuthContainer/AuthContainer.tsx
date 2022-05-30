import {
	Alert
} from '@mui/material';

import {
	useRef,
	useState,
	useEffect,
} from 'react';

import { useApp, localStorageKeys } from '../../../pages/_app';
import AuthForm from '../../components/AuthForm';

import { jwtfetch } from '../../utils';

const AuthContainer = () => {
	const appContext = useApp();

	const formRef = useRef(null);

	const [loading, setLoading] = useState<boolean>(true);
	const [login, setLogin] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [alert, setAlert] = useState(null);

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
				const resp = await jwtfetch('/api/auth', 'POST');
	
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
	const handleSubmit = async e => {
		e.preventDefault();

		const resp = await fetch('/api/auth', {
			method: 'POST',
			body: JSON.stringify({
				login: formRef.current.elements.login.value,
				password: formRef.current.elements.password.value,
			})
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
		} else if (resp.status === 404) {
			/**
			 * Account not found
			 */
			setAlert(
				<Alert severity="error">Аккаунт с таким логином не существует</Alert>
			);
		} else if (resp.status === 400) {
			/**
			 * Wrong password
			 */
			setAlert(
				<Alert severity="error">Неверный пароль</Alert>
			);
		}
	}

	const hideAlert = () => {
		if (alert) {
			setAlert(null);
		}
	}

	const handleLoginChange = e => {
		hideAlert();
		setLogin(e.target.value);
	}

	const handlePasswordChange = e => {
		hideAlert();
		setPassword(e.target.value);
	}

	return (
		<AuthForm
			loading={loading}

			login={login}
			password={password}

			onLoginChange={handleLoginChange}
			onPasswordChange={handlePasswordChange}

			formRef={formRef}

			alert={alert}
			handleSubmit={handleSubmit}
			/>
	);
}

export default AuthContainer;