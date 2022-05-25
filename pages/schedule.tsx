import Head from 'next/head';
import { useEffect, useState } from 'react';

import { useApp } from './_app';
import MainContainer from '../src/containers/MainContainer';
import ScheduleContainer from '../src/containers/ScheduleContainer';

const Schedule = () => {
	const appContext = useApp();

	const [scheduleData, setScheduleData] = useState(null);

	// useEffect(() => {

	// 	const fetchData = async () => {
	// 		const res = await fetch(`/api/schedule/${appContext.userId}`);
	// 		setScheduleData(await res.json());
	// 	}

	// 	fetchData();
	// }, []);

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