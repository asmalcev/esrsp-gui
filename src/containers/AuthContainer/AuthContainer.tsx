import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import AuthForm from '../../components/AuthForm';
import { UserDto } from './user.dto';

const AuthContainer = () => {
	const router = useRouter();

	const { updateUser } = useAuth();

	const [loading, setLoading] = useState<boolean>(true);

	/**
	 * onMount useEffect
	 */
	useEffect(() => {
		const checkSession = async () => {
			const resp = await fetch('/api/auth/');

			if (resp.status === 200) {
				const user: UserDto = await resp.json();

				updateUser({
					...user,
					loggedin: true,
				});
			} else {
				setLoading(false);
			}
		};

		checkSession();
	}, []);

	const formSubmitHandler = async (formData, setErr) => {
		const resp = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		if (resp.status === 200) {
			const user: UserDto = await resp.json();

			updateUser({
				...user,
				loggedin: true,
			});
			router.push('/');
		} else if (resp.status === 404) {
			setErr('Аккаунта с таким логином и паролем не существует');
		} else if (resp.status === 400) {
			setErr('Логин и пароль заполнены неверно');
		}
	};

	return <AuthForm loading={loading} formSubmitHandler={formSubmitHandler} />;
};

export default AuthContainer;
