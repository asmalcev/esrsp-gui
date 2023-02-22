import Head from 'next/head';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import MainContainer from './containers/MainContainer';
import { useAuth, UserRole } from './contexts/AuthContext';

const AdminPageGenerator = ({
	title,
	fetchUrl,
	ContainerComponent,
	dynamicUrl,
}: {
	title: string;
	fetchUrl: string;
	ContainerComponent: any;
	dynamicUrl?: {
		router: string[];
	}
}) => {
	return () => {
		const router = useRouter();
		const { user } = useAuth();

		if (user.role !== UserRole.ADMIN) {
			router.push('/403');
			return;
		}

		let backendFetchUrl = fetchUrl;

		if (dynamicUrl) {
			for (const name of dynamicUrl.router) {
				backendFetchUrl = fetchUrl.replace(`[${name}]`, router.query[name].toString());
			}
		}

		const [data, setData] = useState(null);
		useEffect(() => {
			const fetchData = async () => {
				const res = await fetch(backendFetchUrl);
				setData(await res.json());
			};

			if (user.loggedin && !data) {
				fetchData();
			}
		}, []);

		return (
			<>
				<Head>
					<title>{title} - ESRSP</title>
				</Head>
				<MainContainer>
					{data && <ContainerComponent data={data} />}
				</MainContainer>
			</>
		);
	};
};

export default AdminPageGenerator;
