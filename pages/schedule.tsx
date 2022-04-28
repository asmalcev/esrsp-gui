import Head from 'next/head';
import MainContainer from '../src/containers/MainContainer';
import ScheduleContainer from '../src/containers/ScheduleContainer';

const Schedule = () => {
	return <>
		<Head>
			<title>Расписание - ESRSP</title>
		</Head>
		<MainContainer>
			<ScheduleContainer />
		</MainContainer>
	</>;
};

export default Schedule;