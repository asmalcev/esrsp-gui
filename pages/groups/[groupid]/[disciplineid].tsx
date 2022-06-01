import Head from 'next/head';

import MainContainer from '../../../src/containers/MainContainer';
import GroupContainer from '../../../src/containers/GroupContainer';

const Group = ({
	groupData
}) => {
	return <>
		<Head>
			<title>{ groupData.name } Группа - { groupData.discipline } - ESRSP</title>
		</Head>
		<MainContainer>
			<GroupContainer groupData={ groupData }/>
		</MainContainer>
	</>;
}

export default Group;

export async function getServerSideProps(context) {
	const { groupid, disciplineid } = context.query;

	const res = await fetch(`http://0.0.0.0:3000/api/group/${groupid}/${disciplineid}`);
	const groupData = await res.json();

	return {
		props: { groupData }
	};
}
