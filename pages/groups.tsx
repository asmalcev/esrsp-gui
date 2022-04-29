import Head from 'next/head';
import { Typography } from '@mui/material';
import MainContainer from '../src/containers/MainContainer';

const Groups = () => {
	return <>
		<Head>
			<title>Группы - ESRSP</title>
		</Head>
		<MainContainer>
			<Typography>Группы</Typography>
		</MainContainer>
	</>;
};

export default Groups;