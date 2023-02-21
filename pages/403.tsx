import { Stack, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';

const NotFound = () => {
	return (
		<>
			<Head>
				<title>403 Forbidden - ESRSP</title>
			</Head>
			<Stack
				justifyContent="center"
				alignItems="center"
				sx={{ height: '100vh' }}
			>
				<Typography variant="h1">403 Forbidden</Typography>
				<Link href="/">На главную</Link>
			</Stack>
		</>
	);
};

export default NotFound;
