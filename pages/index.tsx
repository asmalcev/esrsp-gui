import Head from 'next/head';
import { useRouter } from 'next/router';

import MainContainer from '../src/containers/MainContainer';

const Index = () => {
	const router = useRouter();

	router.push('/schedule');

	return <>
		<Head>
			<title>ESRSP</title>
		</Head>
		<MainContainer>
			Главная страница
		</MainContainer>
	</>;
};

export default Index;