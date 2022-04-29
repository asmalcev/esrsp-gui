import '../styles/global.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';

import { theme } from '../src/theme';
import Head from 'next/head';

export default function MyApp({ Component, pageProps } : AppProps) {
	return <>
		<Head>
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/icon?family=Material+Icons"
			/>
		</Head>
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	</>;
}