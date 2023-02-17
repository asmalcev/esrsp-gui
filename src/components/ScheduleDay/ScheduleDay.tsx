import { styled, Typography } from '@mui/material';
import EventCard from '../EventCard';

import styles from './ScheduleDay.styles';
import { ScheduleData } from '../../containers/ScheduleContainer/scheduleData.type';

const DayName = styled(Typography)(styles.dayName);
const ZeroLessons = styled(Typography)(styles.zeroLessons);

const ScheduleDay = ({
	dayData,
	customRef,
}: {
	dayData: ScheduleData;
	customRef;
}) => {
	const lessons = dayData.lessons.map((lesson, index) => {
		const lessonData = {
			...lesson,
			discipline: lesson.discipline.name,
			studentGroups: lesson.studentGroups.map((group) => group.name).join(', '),
		};

		return (
			<EventCard key={lesson.id + index} data={lessonData} customRef={null} />
		);
	});

	return (
		<>
			<DayName
				variant="h2"
				ref={customRef}
			>{`${dayData.date.date} - ${dayData.date.weekDay}`}</DayName>
			{lessons.length > 0 ? lessons : <ZeroLessons>Нет занятий</ZeroLessons>}
		</>
	);
};

export default ScheduleDay;
