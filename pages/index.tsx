import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth, UserRole } from '../src/contexts/AuthContext';

const Index = () => {
	const { user } = useAuth();
	const router = useRouter();

	if (user.role === UserRole.ADMIN) {
		router.push('/admin');
	} else {
		router.push('/schedule');
	}

	return (
		<>
			<Head>
				<title>ESRSP</title>
			</Head>
		</>
	);
};

export default Index;
