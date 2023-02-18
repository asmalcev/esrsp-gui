import '../public/global.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';

import { theme } from '../src/theme';
import { AuthContextProvider } from '../src/contexts/AuthContext';
import { DeviceContextProdiver } from '../src/contexts/DeviceContext';
import { RecordContextProvider } from '../src/contexts/RecordContext';
import { ReloadContextProvider } from '../src/contexts/ReloadContext';

const ESRSPGUI = ({ Component, pageProps }: AppProps) => (
	<ThemeProvider theme={theme}>
		<AuthContextProvider>
			<DeviceContextProdiver>
				<RecordContextProvider>
					<ReloadContextProvider>
						<Component {...pageProps} />
					</ReloadContextProvider>
				</RecordContextProvider>
			</DeviceContextProdiver>
		</AuthContextProvider>
	</ThemeProvider>
);

export default ESRSPGUI;
