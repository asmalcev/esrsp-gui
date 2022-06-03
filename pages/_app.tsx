import '../styles/global.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import { createContext, useContext, useState } from 'react';

import { theme, contrastTheme } from '../src/theme';
import AuthContainer from '../src/containers/AuthContainer';

/**
 * User type
 */
type userType = {
	id?: number | null;
	login?: string;
	usertype?: string;

	name?: string;
	email?: string;

	loggedin: boolean;
}

/**
 * App Context Type
 */
type appContextType = {
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
export const AppContext = createContext<appContextType>({
	user: defaultValues.user,

	updateUser: () => {},
});


/**
 * App Provider - Next App
 */
const AppProvider = ({ Component, pageProps } : AppProps) => {

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

	return <AppContext.Provider value={contextObj}>
		<ThemeProvider theme={theme}>
			{
				user.loggedin ?
					<Component {...pageProps} /> :
					<AuthContainer />
			}
		</ThemeProvider>
	</AppContext.Provider>
}

export const useApp = () => {
	return useContext(AppContext);
}

export const localStorageKeys = {
	jwt: 'jwt'
};

export default AppProvider;