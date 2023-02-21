import Head from 'next/head';
import { useEffect, useState } from 'react';

import MainContainer from '../src/containers/MainContainer';
import GroupsContainer from '../src/containers/GroupsContainer';
import { useAuth, UserRole } from '../src/contexts/AuthContext';
import { StudentGroupDiscipline } from '../src/backend.types';
import { useRouter } from 'next/router';

const Groups = () => {
	const { user } = useAuth();
	const router = useRouter();

	if (user.role !== UserRole.TEACHER && user.role !== UserRole.ADMIN) {
		router.push('/403');
		return;
	}

	const [groupsData, setGroupsData] = useState<StudentGroupDiscipline[]>(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`/api/schedule/teacher/${user.roleId}/groups/`);
			setGroupsData(await res.json());
		};

		if (user.loggedin && !groupsData) {
			fetchData();
		}
	});

	return (
		<>
			<Head>
				<title>Группы - ESRSP</title>
			</Head>
			<MainContainer>
				<GroupsContainer groupsData={groupsData} />
			</MainContainer>
		</>
	);
};

export default Groups;
