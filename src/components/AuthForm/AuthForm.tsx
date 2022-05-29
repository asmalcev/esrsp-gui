import {
	Paper,
	Stack,
	styled,
	Typography,
} from '@mui/material';

import StyledButton from '../../components/StyledButton';
import StyledTextField from '../../components/StyledTextField';

import styles from './AuthForm.styles';

interface AuthFormProps {
	loading: boolean;

	login: string;
	password: string;

	onLoginChange: any;
	onPasswordChange: any;

	handleSubmit: any;

	formRef: any;
	alert: any;
}

const AuthForm = ({
	loading,
	login,
	password,
	onLoginChange,
	onPasswordChange,
	handleSubmit,
	alert,
	formRef,
} : AuthFormProps) => {

	const AuthLayout = styled(Stack)( styles.container );
	const AuthPaper = styled(Paper)( styles.paper );

	const InputBox = styled(Stack)( styles.inputBox );

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
								fullWidth={true}
								onChange={onLoginChange}
								value={login}
								required/>
							<StyledTextField
								label="Пароль"
								type="password"
								name="password"
								fullWidth={true}
								onChange={onPasswordChange}
								value={password}
								required/>
							{ alert }
						</InputBox>
						<StyledButton
							onClick={handleSubmit}
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

export default AuthForm;