import Head from 'next/head';
import { useEffect, useState } from 'react';

import MainContainer from '../src/containers/MainContainer';
import { jwtfetch } from '../src/utils';
import { useAuth } from '../src/contexts/AuthContext';
import { useRouter } from 'next/router';


const Groups = () => {

	const router = useRouter();
	const { user } = useAuth();

	if (user.usertype !== 'admin') {
		router.push('/schedule');
	}

	const [tablesData, setTablesData] = useState(null);

	useEffect(() => {

		const fetchData = async () => {
			const res = await jwtfetch(`/api/admin/tables`);
			setTablesData(await res.json());
		}

		if (user.loggedin && !tablesData) {
			fetchData();
		}
	});

	return <>
		<Head>
			<title>Управление данными - ESRSP</title>
		</Head>
		<MainContainer>
			Управление данными
		</MainContainer>
	</>;
}

export default Groups;