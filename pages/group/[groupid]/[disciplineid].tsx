import Head from 'next/head';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import MainContainer from '../../../src/containers/MainContainer';
import GroupContainer from '../../../src/containers/GroupContainer';
import { useAuth } from '../../../src/contexts/AuthContext';
import { StudentGroupPerformance } from '../../../src/backend.types';

const Group = () => {
	const router = useRouter();
	const { groupid, disciplineid } = router.query;

	const { user } = useAuth();

	const [groupData, setGroupData] = useState<StudentGroupPerformance>(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(
				`/api/schedule/performance/${groupid}/${disciplineid}`,
			);
			setGroupData(await res.json());
		};

		if (user.loggedin && !groupData) {
			fetchData();
		}
	});

	return (
		<>
			<Head>
				{groupData ? (
					<title>
						{groupData.studentGroup.name} Группа - {groupData.discipline.name} -
						ESRSP
					</title>
				) : (
					<title>Группа - ESRSP</title>
				)}
			</Head>
			<MainContainer>
				{groupData && <GroupContainer groupData={groupData} />}
			</MainContainer>
		</>
	);
};

export default Group;
