import { createContext, useContext, useState } from 'react';
import AuthContainer from '../containers/AuthContainer';

export enum UserRole {
	NOTaUSER = 0,
	STUDENT = 1,
	TEACHER = 2,
	ADMIN = 3,
}

export type User = {
	id?: number | null;
	username?: string;
	role?: UserRole;
	roleId?: number;

	fullname?: string;

	loggedin: boolean;
};

export type AuthContext = {
	user: User | null;

	updateUser: (n: User) => void;
	logout: () => void;
};

const defaultValues = {
	user: {
		loggedin: false,
	},
};

export const AuthContext = createContext<AuthContext>({
	user: defaultValues.user,

	updateUser: () => {},
	logout: () => {},
});

export const AuthContextProvider = (props) => {
	const { children, ...other } = props;

	const [user, setUser] = useState<User>(defaultValues.user);

	const updateUser = (user) => {
		setUser(user);
	};

	const logout = async () => {
		await fetch('/api/auth/logout', {
			method: 'POST',
		});

		updateUser(defaultValues.user);
	};

	const contextObj = {
		user,
		updateUser,
		logout,
	};

	return (
		<AuthContext.Provider value={contextObj} {...other}>
			{user.loggedin ? children : <AuthContainer />}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
