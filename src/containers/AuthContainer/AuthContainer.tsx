import {
	Alert, Snackbar
} from '@mui/material';

import {
	useRef,
	useState,
	useEffect,
} from 'react';

import { useApp, localStorageKeys } from '../../../pages/_app';
import AuthForm from '../../components/AuthForm';

import { jwtfetch } from '../../utils';


interface AlertState {
	value?: JSX.Element;
	open: boolean;
}

const AuthContainer = () => {
	const appContext = useApp();

	const [loading, setLoading] = useState<boolean>(true);
	const [alert, setAlert] = useState<AlertState>({ open: false });

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
	const formSubmitHandler = async formData => {
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
		} else if (resp.status === 404) {
			/**
			 * Account not found
			 */
			setAlert({
				value: <Alert severity="error" onClose={onSnackbarClose}>Аккаунта с таким логином не существует</Alert>,
				open: true
			});
		} else if (resp.status === 400) {
			/**
			 * Wrong password
			 */
			setAlert({
				value: <Alert severity="error" onClose={onSnackbarClose}>Неверный пароль</Alert>,
				open: true
			});
		}
	}

	const onSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlert({
			open: false
		});
	}

	return <>
		<AuthForm
			loading={loading}
			formSubmitHandler={formSubmitHandler}
			/>
		<Snackbar open={ alert.open } autoHideDuration={6000} onClose={onSnackbarClose}>
			{ alert.value }
		</Snackbar>
	</>;
}

export default AuthContainer;