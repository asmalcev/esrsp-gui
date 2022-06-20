import { createContext, useContext, useState } from 'react';
import AuthContainer from '../containers/AuthContainer';

/**
 * User type
 */
type userType = {
	id?: number | null;
	login?: string;
	usertype?: 'admin' | 'teacher' | 'student';

	name?: string;
	email?: string;

	loggedin: boolean;
}

/**
 * App Context Type
 */
type AuthContextType = {
	user: userType | null;

	updateUser: (n : userType) => void;
}


const defaultValues = {
	user: {
		loggedin: false
	}
};


/**
 * App Context Object
 */
export const AuthContext = createContext<AuthContextType>({
	user: defaultValues.user,

	updateUser: () => {},
});


/**
 * App Provider - Next App
 */
const AuthContextProvider = props => {
	const { children, ...other } = props;

	const [user, setUser] = useState<userType>(defaultValues.user);

	const updateUser = user => {
		setUser(user);
	}


	/**
	 * Building app context object
	 */
	const contextObj = {
		user,
		updateUser,
	};

	return (
		<AuthContext.Provider value={contextObj} {...other}>
			{
				user.loggedin ?
					children :
					<AuthContainer />
			}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
}

export const localStorageKeys = {
	jwt: 'jwt'
};

export default AuthContextProvider;