import { styled, Typography } from '@mui/material';
import EventCard from '../EventCard';

import styles from './ScheduleDay.styles';
import { ScheduleData } from '../../containers/ScheduleContainer/scheduleData.type';

const DayName = styled(Typography)(styles.dayName);
const ActiveDayName = styled(DayName)(styles.activeDayName);
const ZeroLessons = styled(Typography)(styles.zeroLessons);

const ScheduleDay = ({
	dayData,
	customRef,
	active = false,
}: {
	dayData: ScheduleData;
	customRef;
	active?: boolean;
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

	const DayComponent = active ? ActiveDayName : DayName;

	return (
		<>
			<DayComponent
				variant="h2"
				ref={customRef}
			>{`${dayData.date.date} - ${dayData.date.weekDay}`}</DayComponent>
			{lessons.length > 0 ? lessons : <ZeroLessons>Нет занятий</ZeroLessons>}
		</>
	);
};

export default ScheduleDay;
