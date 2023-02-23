import { Alert, Paper, Stack, styled, Typography } from '@mui/material';

import useAuthForm from './useAuthForm';
import Button from '../../common/Button';
import TextField from '../../common/TextField';

import styles from './AuthForm.styles';
import InputBox from '../../common/InputBox';

type formSubmitHandlerProps = {
	username: string;
	password: string;
};

type AuthFormProps = {
	loading: boolean;
	formSubmitHandler: (
		props: formSubmitHandlerProps,
		setErr: (err: string) => void,
	) => void;
};

const AuthLayout = styled(Stack)(styles.container);
const AuthPaper = styled(Paper)(styles.paper);

const AuthForm = ({ loading, formSubmitHandler }: AuthFormProps) => {
	const [credentials, setUsername, setPassword, setErr] = useAuthForm();

	const onSubmitButtonClick = (e) => {
		e.preventDefault();

		formSubmitHandler(credentials.value, setErr);
	};

	return (
		<AuthLayout direction="row" justifyContent="center" alignItems="center">
			{!loading && (
				<AuthPaper>
					<Typography variant="h1">Войти в аккаунт</Typography>
					<InputBox spacing={2}>
						<TextField
							label="Логин"
							name="username"
							fullWidth
							value={credentials.value.username}
							onChange={setUsername}
							required
						/>
						<TextField
							label="Пароль"
							type="password"
							name="password"
							fullWidth
							value={credentials.value.password}
							onChange={setPassword}
							required
						/>
						{credentials.err && (
							<Alert severity="error">{credentials.err}</Alert>
						)}
					</InputBox>
					<Button onClick={onSubmitButtonClick} fullWidth type="submit">
						Войти
					</Button>
				</AuthPaper>
			)}
		</AuthLayout>
	);
};

export default AuthForm;
