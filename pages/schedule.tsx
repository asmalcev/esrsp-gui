import Head from 'next/head';
import { useEffect, useState } from 'react';

import MainContainer from '../src/containers/MainContainer';
import ScheduleContainer from '../src/containers/ScheduleContainer';
import { useAuth } from '../src/contexts/AuthContext';

const Schedule = () => {
	const { user } = useAuth();

	const [scheduleData, setScheduleData] = useState(null);

	useEffect(() => {

		const fetchData = async () => {
			const res = await fetch(`/api/schedule/`);
			setScheduleData(await res.json());
		}

		if (user.loggedin && !scheduleData) {
			fetchData();
		}
	});

	console.log(scheduleData);

	return <>
		<Head>
			<title>Расписание - ESRSP</title>
		</Head>
		<MainContainer>
			{/* <ScheduleContainer scheduleData={ scheduleData }/> */}
		</MainContainer>
	</>;
};

export default Schedule;