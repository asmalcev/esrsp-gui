import {
	useState
} from 'react';

// TODO: should be move in seperated file
export type FormItem<T> = {
	value: T;
	err: string;
};

export type AuthFormItem = FormItem<{
	login: string;
	password: string;
}>;

type UseAuthFormReturnType = [
	credentials: AuthFormItem,
	setLogin: (login : string) => void,
	setPassword: (passwrod : string) => void,
	setErr: (err : string) => void,
];

const useAuthForm = () : UseAuthFormReturnType => {
	const [credentials, setCredentials] = useState<AuthFormItem>({
		value: {
			login: '',
			password: '',
		},
		err: '',
	});

	const setLogin = (login : string) : void => {
		setCredentials((prev : AuthFormItem) : AuthFormItem => ({
			value: {
				login,
				password: prev.value.password,
			},
			err: '',
		}));
	};

	const setPassword = (password : string) : void => {
		setCredentials((prev : AuthFormItem) : AuthFormItem => ({
			value: {
				login: prev.value.login,
				password,
			},
			err: '',
		}));
	};

	const setErr = (err : string) : void => {
		setCredentials((prev : AuthFormItem) : AuthFormItem => ({
			value: {
				login: prev.value.login,
				password: prev.value.password,
			},
			err,
		}));
	};

	return [
		credentials,
		setLogin,
		setPassword,
		setErr,
	];
}

export default useAuthForm;