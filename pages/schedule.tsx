import Head from 'next/head';
import MainContainer from '../src/containers/MainContainer';
import ScheduleContainer from '../src/containers/ScheduleContainer';

const Schedule = ({ scheduleData }) => {
	return <>
		<Head>
			<title>Расписание - ESRSP</title>
		</Head>
		<MainContainer>
			<ScheduleContainer scheduleData={ scheduleData }/>
		</MainContainer>
	</>;
};

export default Schedule;

export async function getServerSideProps(context) {
	const res = await fetch('http://0.0.0.0:3000/api/schedule');
	const scheduleData = await res.json();	

	return {
		props: { scheduleData }
	};
}