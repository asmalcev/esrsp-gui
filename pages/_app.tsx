import '../styles/global.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import { createContext, useContext, useState } from 'react';

import { theme } from '../src/theme';
import AuthContainer from '../src/containers/AuthContainer';

/**
 * App Context Type
 */
type appContextType = {
	userId: number | null;
	loggedin: boolean | null;

	updateUserId: (n : number) => void;
	updateLoggedin: (b : boolean) => void;
}


/**
 * App Context Object
 */
export const AppContext = createContext<appContextType>({
	userId: null,
	loggedin: false,

	updateUserId: () => {},
	updateLoggedin: () => {},
});


/**
 * App Provider - Next App
 */
const AppProvider = ({ Component, pageProps } : AppProps) => {
	/**
	 * App states
	 */
	const [userId, setUserId] = useState<number>(null);
	const [loggedin, setLoggedin] = useState<boolean>(false);


	/**
	 * States update handlers
	 */
	const updateUserId = newUserId => {
		setUserId(newUserId);
	}

	const updateLoggedin = newState => {
		setLoggedin(newState);
	}


	/**
	 * Building app context object
	 */
	const contextObj = {
		userId,
		loggedin,

		updateUserId,
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