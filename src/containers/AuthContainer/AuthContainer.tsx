import {
	Box,
	Paper,
	Stack,
	styled,
	TextField,
	Typography
} from '@mui/material';
import { useEffect } from 'react';

import { useApp } from '../../../pages/_app';
import StyledButton from '../../components/StyledButton';
import StyledTextField from '../../components/StyledTextField';

import styles from './AuthContainer.styles';

const AuthContainer = () => {
	const appContext = useApp();

	const AuthLayout = styled(Stack)( styles.container );
	const AuthPaper = styled(Paper)( styles.paper );

	const InputBox = styled(Stack)( styles.inputBox );

	useEffect(() => {
		const jwt = window.localStorage.jwt;
		if (jwt !== undefined) {
			appContext.updateLoggedin(true);
		}
	}, [])

	const handleClick = () => {
		window.localStorage.jwt = 'some-jwt';

		appContext.updateLoggedin(true);
	}

	return <AuthLayout
		direction="row"
		justifyContent="center"
	>
		<Stack justifyContent="center">
			<AuthPaper>
				<Typography variant="h1">Войти в аккаунт</Typography>
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
			</AuthPaper>
		</Stack>
	</AuthLayout>;
}

export default AuthContainer;