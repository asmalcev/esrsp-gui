import '../public/global.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';

import { theme } from '../src/theme';
import { AuthContextProvider } from '../src/contexts/AuthContext';
import { DeviceContextProdiver } from '../src/contexts/DeviceContext';


const ESRSPGUI = ({ Component, pageProps } : AppProps) => (
	<ThemeProvider theme={theme}>
		<AuthContextProvider>
			<DeviceContextProdiver>
				<Component {...pageProps} />
			</DeviceContextProdiver>
		</AuthContextProvider>
	</ThemeProvider>
);

export default ESRSPGUI;