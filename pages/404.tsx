import { Stack, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';

const NotFound = () => {

	return (
		<>
			<Head>
				<title>404 Not Found - ESRSP</title>
			</Head>
			<Stack
				justifyContent="center"
				alignItems="center"
				sx={{ height: '100vh' }}
			>
				<Typography variant='h1'>404 Not Found</Typography>
				<Link href="/">На главную</Link>
			</Stack>
		</>
	);
};

export default NotFound;
