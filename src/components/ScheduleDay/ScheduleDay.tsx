import {
	styled,
	Typography
} from "@mui/material";
import EventCard from "../EventCard";

import styles from './ScheduleDay.styles';

const ScheduleDay = ({ dayData, customRef }) => {

	const DayName = styled(Typography)( styles.dayName );
	const ZeroLessons = styled(Typography)( styles.zeroLessons );

	const lessons = dayData.lessons.map((lesson, index) =>
		<EventCard
			key={ lesson.name + index }
			data={ lesson }
			customRef={null}/>
	);

	return <>
		<DayName variant="h2" ref={customRef}>{`${dayData.date.date} - ${dayData.date.weekDay}`}</DayName>
		{
			lessons.length > 0 ?
				lessons :
				<ZeroLessons>Нет занятий</ZeroLessons>
		}
	</>;
}

export default ScheduleDay;