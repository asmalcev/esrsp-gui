import Head from 'next/head';
import { useRouter } from 'next/router';

const Index = () => {
	const router = useRouter();

	router.push('/schedule');

	return (
		<>
			<Head>
				<title>ESRSP</title>
			</Head>
		</>
	);
};

export default Index;
