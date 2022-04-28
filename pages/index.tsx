import Head from 'next/head';
import { Typography } from '@mui/material';
import MainContainer from '../src/containers/MainContainer';

const Index = () => {
	return <>
		<Head>
			<title>ESRSP</title>
		</Head>
		<MainContainer>
			<Typography>Главная страница</Typography>
		</MainContainer>
	</>;
};

export default Index;