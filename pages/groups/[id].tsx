import Head from 'next/head';
import { useRouter } from 'next/router';

import MainContainer from '../../src/containers/MainContainer';
import GroupGrid from '../../src/components/GroupGrid';

const Group = ({
	groupData
}) => {
	const router = useRouter();
	const { id } = router.query;

	return <>
		<Head>
			<title>Группы - ESRSP</title>
		</Head>
		<MainContainer>
			<p>Группа {id}</p>
			<GroupGrid />
		</MainContainer>
	</>;
}

export default Group;

export async function getServerSideProps(context) {
	const res = await fetch('http://0.0.0.0:3000/api/group');
	const groupData = await res.json();	

	return {
		props: { groupData }
	}
}
