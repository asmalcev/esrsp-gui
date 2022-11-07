import '../public/global.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';

import { theme } from '../src/theme';
import AuthContextProvider from '../src/contexts/AuthContext';


const ESRSPGUI = ({ Component, pageProps } : AppProps) => (
	<ThemeProvider theme={theme}>
		<AuthContextProvider>
			<Component {...pageProps} />
		</AuthContextProvider>
	</ThemeProvider>
);

export default ESRSPGUI;