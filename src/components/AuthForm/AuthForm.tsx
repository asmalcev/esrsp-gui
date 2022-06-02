import {
	Alert,
	Paper,
	Stack,
	styled,
	Typography,
} from '@mui/material';

import useAuthForm from './useAuthForm';
import StyledButton from '../../components/StyledButton';
import StyledTextField from '../../components/StyledTextField';

import styles from './AuthForm.styles';


type formSubmitHandlerProps = {
	login: string;
	password: string;
}

type AuthFormProps = {
	loading: boolean;
	formSubmitHandler: (
		props : formSubmitHandlerProps,
		setErr : (err : string) => void,
	) => void;
}

const AuthLayout = styled(Stack)( styles.container );
const AuthPaper = styled(Paper)( styles.paper );

const InputBox = styled(Stack)( styles.inputBox );

const AuthForm = ({
	loading,
	formSubmitHandler,
} : AuthFormProps) => {

	const [credentials, setLogin, setPassword, setErr] = useAuthForm();

	const onSubmitButtonClick = e => {
		e.preventDefault();

		formSubmitHandler(credentials.value, setErr);
	}

	return <AuthLayout
		direction="row"
		justifyContent="center"
		alignItems="center"
	>
		{
			!loading &&
			<AuthPaper>
				<Typography variant="h1">Войти в аккаунт</Typography>
				<InputBox spacing={2}>
					<StyledTextField
						label="Логин"
						name="login"
						fullWidth
						value={credentials.value.login}
						onChange={setLogin}
						required/>
					<StyledTextField
						label="Пароль"
						type="password"
						name="password"
						fullWidth
						value={credentials.value.password}
						onChange={setPassword}
						required/>
					{
						credentials.err &&
						<Alert severity="error">{ credentials.err }</Alert>
					}
				</InputBox>
				<StyledButton
					onClick={onSubmitButtonClick}
					fullWidth
					type="submit"
				>
					Войти
				</StyledButton>
			</AuthPaper>
		}
	</AuthLayout>;
}

export default AuthForm;