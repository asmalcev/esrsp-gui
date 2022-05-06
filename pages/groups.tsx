import Head from 'next/head';

import MainContainer from '../src/containers/MainContainer';
import GroupsContainer from '../src/containers/GroupsContainer';


const Groups = ({ groupsData }) => {
	return <>
		<Head>
			<title>Группы - ESRSP</title>
		</Head>
		<MainContainer>
			<GroupsContainer groupsData={ groupsData } />
		</MainContainer>
	</>;
};

export default Groups;

export async function getServerSideProps(context) {
	const res = await fetch('http://0.0.0.0:3000/api/groups');
	const groupsData = await res.json();	

	return {
		props: { groupsData }
	}
}