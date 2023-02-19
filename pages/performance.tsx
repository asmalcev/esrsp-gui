import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Discipline } from '../src/backend.types';

import MainContainer from '../src/containers/MainContainer';
import PerformanceContainer from '../src/containers/PerformanceContainer';
import { useAuth } from '../src/contexts/AuthContext';

const Groups = () => {
	const { user } = useAuth();

	const [performanceData, setPerformanceData] = useState<Discipline[]>(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(
				`/api/schedule/student/${user.roleId}/performance/`,
			);
			setPerformanceData(await res.json());
		};

		if (user.loggedin && !performanceData) {
			fetchData();
		}
	});

	return (
		<>
			<Head>
				<title>Успеваемость - ESRSP</title>
			</Head>
			<MainContainer>
				{performanceData && (
					<PerformanceContainer performanceData={performanceData} />
				)}
			</MainContainer>
		</>
	);
};

export default Groups;
