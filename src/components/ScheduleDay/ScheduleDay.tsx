import {
	styled,
	Typography
} from "@mui/material";
import EventCard, { SkeletonEventCard } from "../EventCard";

import styles from './ScheduleDay.styles';

const ScheduleDay = ({ dayData }) => {

	const DayName = styled(Typography)( styles.dayName );

	const lessons = dayData.lessons.map((lesson, index) =>
		<EventCard
			key={ lesson.name + index }
			data={ lesson }
		/>
	);
	
	return <>
		<DayName variant="h2">{ dayData.date }</DayName>
		{ lessons }
	</>;
}

export default ScheduleDay;