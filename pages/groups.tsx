import Head from 'next/head';
import { useEffect, useState } from 'react';

import MainContainer from '../src/containers/MainContainer';
import GroupsContainer from '../src/containers/GroupsContainer';
import { useAuth } from '../src/contexts/AuthContext';


const Groups = () => {
	const { user } = useAuth();

	const [groupsData, setGroupsData] = useState(null);

	useEffect(() => {

		const fetchData = async () => {
			const res = await fetch(`/api/groups/${user.id}`, {
				method: 'POST',
			});
			setGroupsData(await res.json());
		}

		if (user.loggedin && !groupsData) {
			fetchData();
		}
	});

	return <>
		<Head>
			<title>Группы - ESRSP</title>
		</Head>
		<MainContainer>
			<GroupsContainer groupsData={ groupsData } />
		</MainContainer>
	</>;
}

export default Groups;