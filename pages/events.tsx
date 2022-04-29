import Head from 'next/head';
import { Typography } from '@mui/material';
import MainContainer from '../src/containers/MainContainer';

const Events = () => {
	return <>
		<Head>
			<title>Мероприятия - ESRSP</title>
		</Head>
		<MainContainer>
			<Typography>Мероприятия</Typography>
		</MainContainer>
	</>;
};

export default Events;