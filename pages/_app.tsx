import '../styles/global.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import { createContext, useContext, useState } from 'react';

import { theme } from '../src/theme';
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
}

/**
 * App Context Type
 */
type appContextType = {
	user: userType | null;
	loggedin: boolean | null;

	updateUser: (n : userType) => void;
	updateLoggedin: (b : boolean) => void;
}


/**
 * App Context Object
 */
export const AppContext = createContext<appContextType>({
	user: null,
	loggedin: false,

	updateUser: () => {},
	updateLoggedin: () => {},
});


/**
 * App Provider - Next App
 */
const AppProvider = ({ Component, pageProps } : AppProps) => {
	/**
	 * App states
	 */
	const [user, setUser] = useState<userType>(null);
	const [loggedin, setLoggedin] = useState<boolean>(false);


	/**
	 * States update handlers
	 */
	const updateUser = user => {
		setUser(user);
	}

	const updateLoggedin = state => {
		setLoggedin(state);
	}


	/**
	 * Building app context object
	 */
	const contextObj = {
		user,
		loggedin,

		updateUser,
		updateLoggedin,
	};

	return <AppContext.Provider value={contextObj}>
		<ThemeProvider theme={theme}>
			{
				loggedin ?
					<Component {...pageProps} /> :
					<AuthContainer />
			}
		</ThemeProvider>
	</AppContext.Provider>
}

export const useApp = () => {
	return useContext(AppContext);
}

export default AppProvider;