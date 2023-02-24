import Head from 'next/head';

import MainContainer from '../../src/containers/MainContainer';
import { useAuth, UserRole } from '../../src/contexts/AuthContext';
import { useRouter } from 'next/router';
import UploadContainer from '../../src/containers/admin/UploadContainer';

const AdminUpload = () => {
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
				<UploadContainer />
			</MainContainer>
		</>
	);
};

export default AdminUpload;
