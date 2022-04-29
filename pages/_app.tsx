import '../styles/global.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';

import { theme } from '../src/theme';

export default function MyApp({ Component, pageProps } : AppProps) {
	return <>
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	</>;
}