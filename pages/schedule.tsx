import Head from 'next/head';
import { useEffect, useState } from 'react';

import MainContainer from '../src/containers/MainContainer';
import ScheduleContainer from '../src/containers/ScheduleContainer';
import { useAuth, UserRole } from '../src/contexts/AuthContext';
import { TimedLesson } from '../src/backend.types';
import { useRouter } from 'next/router';

const Schedule = () => {
	const { user } = useAuth();
	const router = useRouter();

	if (user.role === UserRole.ADMIN) {
		router.push('/admin');
		return;
	}

	const [scheduleData, setScheduleData] = useState<TimedLesson[]>(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`/api/schedule/`);
			setScheduleData(await res.json());
		};

		if (user.loggedin && !scheduleData) {
			fetchData();
		}
	}, []);

	return (
		<>
			<Head>
				<title>Расписание - ESRSP</title>
			</Head>
			<MainContainer>
				<ScheduleContainer scheduleData={scheduleData} />
			</MainContainer>
		</>
	);
};

export default Schedule;
