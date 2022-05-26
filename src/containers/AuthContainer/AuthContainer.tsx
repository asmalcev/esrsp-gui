import {
	Paper,
	Stack,
	styled,
	Typography
} from '@mui/material';
import {
	useRef,
	useEffect
} from 'react';

import { useApp } from '../../../pages/_app';
import StyledButton from '../../components/StyledButton';
import StyledTextField from '../../components/StyledTextField';

import { jwtfetch } from '../../utils';

import styles from './AuthContainer.styles';

const AuthContainer = () => {
	const appContext = useApp();

	const formRef = useRef(null);

	const AuthLayout = styled(Stack)( styles.container );
	const AuthPaper = styled(Paper)( styles.paper );

	const InputBox = styled(Stack)( styles.inputBox );

	useEffect(() => {
		const jwt = window.localStorage.jwt;
		if (jwt !== undefined) {
			jwtfetch('/api/auth', 'POST')
				.then(resp => {
					console.log(resp);
				})
			// appContext.updateLoggedin(true);
		}
	}, []);

	const handleClick = () => {
		fetch('/api/auth', {
			method: 'POST',
			body: JSON.stringify({
				login: formRef.current.elements.login.value,
				password: formRef.current.elements.password.value,
			})
		}).then(resp => resp.json())
			.then(data => {
				window.localStorage.jwt = data.jwt;
				// appContext.updateLoggedin(true);
			});
	}

	return <AuthLayout
		direction="row"
		justifyContent="center"
	>
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
							required/>
						<StyledTextField
							label="Пароль"
							type="password"
							name="password"
							fullWidth={true}
							required/>
					</InputBox>
					<StyledButton
						onClick={handleClick}
						fullWidth={true}
					>
						Войти
					</StyledButton>
				</form>
			</AuthPaper>
		</Stack>
	</AuthLayout>;
}

export default AuthContainer;