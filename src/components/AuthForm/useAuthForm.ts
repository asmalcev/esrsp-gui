import { useState } from 'react';

// TODO: should be move in seperated file
export type FormItem<T> = {
	value: T;
	err: string;
};

export type AuthFormItem = FormItem<{
	username: string;
	password: string;
}>;

type UseAuthFormReturnType = [
	credentials: AuthFormItem,
	setUsername: (username: string) => void,
	setPassword: (passwrod: string) => void,
	setErr: (err: string) => void,
];

const useAuthForm = (): UseAuthFormReturnType => {
	const [credentials, setCredentials] = useState<AuthFormItem>({
		value: {
			username: '',
			password: '',
		},
		err: '',
	});

	const setUsername = (username: string): void => {
		setCredentials(
			(prev: AuthFormItem): AuthFormItem => ({
				value: {
					username: username,
					password: prev.value.password,
				},
				err: '',
			}),
		);
	};

	const setPassword = (password: string): void => {
		setCredentials(
			(prev: AuthFormItem): AuthFormItem => ({
				value: {
					username: prev.value.username,
					password,
				},
				err: '',
			}),
		);
	};

	const setErr = (err: string): void => {
		setCredentials(
			(prev: AuthFormItem): AuthFormItem => ({
				value: {
					username: prev.value.username,
					password: prev.value.password,
				},
				err,
			}),
		);
	};

	return [credentials, setUsername, setPassword, setErr];
};

export default useAuthForm;
