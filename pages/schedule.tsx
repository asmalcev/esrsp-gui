import Head from 'next/head';
import { useEffect, useState } from 'react';

import { useApp } from './_app';
import MainContainer from '../src/containers/MainContainer';
import ScheduleContainer from '../src/containers/ScheduleContainer';

import { jwtfetch } from '../src/utils';

const Schedule = () => {
	const { user } = useApp();

	const [scheduleData, setScheduleData] = useState(null);

	useEffect(() => {

		const fetchData = async () => {
			const res = await jwtfetch(`/api/schedule/${user.id}`);
			setScheduleData(await res.json());
		}

		if (user.loggedin && !scheduleData) {
			fetchData();
		}
	});

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