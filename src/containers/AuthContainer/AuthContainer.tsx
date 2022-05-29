import {
	Alert,
	Paper,
	Stack,
	styled,
	Typography
} from '@mui/material';
import {
	useRef,
	useState,
	useEffect,
} from 'react';

import { useApp } from '../../../pages/_app';
import StyledButton from '../../components/StyledButton';
import StyledTextField from '../../components/StyledTextField';

import { jwtfetch } from '../../utils';

import styles from './AuthContainer.styles';

const AuthContainer = () => {
	const appContext = useApp();

	const formRef = useRef(null);

	const [loading, setLoading] = useState(true);
	const [alertElement, setAlertElement] = useState(null);

	const AuthLayout = styled(Stack)( styles.container );
	const AuthPaper = styled(Paper)( styles.paper );

	const InputBox = styled(Stack)( styles.inputBox );

	useEffect(() => {
		const jwt = window.localStorage.jwt;
		if (jwt !== undefined) {
			jwtfetch('/api/auth', 'POST')
				.then(resp => {
					if (resp.status === 200) {
						appContext.updateLoggedin(true);
					} else {
						setLoading(false);
					}
				})
		} else {
			setLoading(false);
		}
	}, []);

	const handleClick = e => {
		e.preventDefault();
		fetch('/api/auth', {
			method: 'POST',
			body: JSON.stringify({
				login: formRef.current.elements.login.value,
				password: formRef.current.elements.password.value,
			})
		}).then(resp => {
			if (resp.status === 200) {
				return resp.json();
			} else if (resp.status === 404) {
				setAlertElement(
					<Alert severity="error">Аккаунт с таким логином не существует</Alert>
				);
			} else if (resp.status === 400) {
				setAlertElement(
					<Alert severity="error">Неверный пароль</Alert>
				);
			}
		}).then(data => {
				console.log(data);

				// window.localStorage.jwt = data.jwt;
				// appContext.updateLoggedin(true);
			});
	}

	const hideAlert = () => {
		if (alertElement) {
			setAlertElement(null);
		}
	}

	return <AuthLayout
		direction="row"
		justifyContent="center"
	>
		{
			!loading &&
			<Stack justifyContent="center">
				<AuthPaper>
					<Typography variant="h1">Войти в аккаунт</Typography>
					<form ref={formRef}>
						<InputBox spacing={2}>
							<StyledTextField
								label="Логин"
								name="login"
								autoFocus={true}
								fullWidth={true}
								onChange={hideAlert}
								required/>
							<StyledTextField
								label="Пароль"
								type="password"
								name="password"
								fullWidth={true}
								onChange={hideAlert}
								required/>
							{ alertElement }
						</InputBox>
						<StyledButton
							onClick={handleClick}
							fullWidth={true}
							type="submit"
						>
							Войти
						</StyledButton>
					</form>
				</AuthPaper>
			</Stack>
		}
	</AuthLayout>;
}

export default AuthContainer;