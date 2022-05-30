import {
	Paper,
	Stack,
	styled,
	Typography,
} from '@mui/material';

import {
	useRef,
} from 'react';

import StyledButton from '../../components/StyledButton';
import StyledTextField from '../../components/StyledTextField';

import styles from './AuthForm.styles';


interface formSubmitHandlerProps {
	login: string;
	password: string;
}

interface AuthFormProps {
	loading: boolean;
	formSubmitHandler: (props : formSubmitHandlerProps) => void;
}

const AuthForm = ({
	loading,
	formSubmitHandler,
} : AuthFormProps) => {

	const formRef = useRef(null);

	const AuthLayout = styled(Stack)( styles.container );
	const AuthPaper = styled(Paper)( styles.paper );

	const InputBox = styled(Stack)( styles.inputBox );

	const onSubmitButtonClick = e => {
		e.preventDefault();

		const formData = {
			login: formRef.current.elements.login.value,
			password: formRef.current.elements.password.value,
		};

		formSubmitHandler(formData);
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
							onClick={onSubmitButtonClick}
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