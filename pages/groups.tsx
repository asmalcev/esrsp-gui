import Head from 'next/head';
import { useEffect, useState } from 'react';

import { useApp } from './_app';
import MainContainer from '../src/containers/MainContainer';
import GroupsContainer from '../src/containers/GroupsContainer';
import { jwtfetch } from '../src/utils';


const Groups = () => {
	const { user } = useApp();

	const [groupsData, setGroupsData] = useState(null);

	useEffect(() => {

		const fetchData = async () => {
			const res = await jwtfetch(`/api/groups/${user.id}`);
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