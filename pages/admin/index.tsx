import Head from 'next/head';

import MainContainer from '../../src/containers/MainContainer';
import { useAuth, UserRole } from '../../src/contexts/AuthContext';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';

const Admin = () => {
	const router = useRouter();
	const { user } = useAuth();

	if (user.role !== UserRole.ADMIN) {
		router.push('/403');
		return;
	}

	return (
		<>
			<Head>
				<title>Управление данными - ESRSP</title>
			</Head>
			<MainContainer>
				<Typography variant="h2">Управление данными</Typography>
			</MainContainer>
		</>
	);
};

export default Admin;
