import { useRef, useState } from "react";

import { Stack } from "@mui/material";
import Layout from "../Layout";
import { SkeletonEventCard } from "../../components/EventCard";
import ScheduleView from "./ScheduleView";

import { isOddWeek } from '../../utils';
import { months, weekDays } from "./dateData";


/**
 * generate data for rendering
 * based on schedule and date of the first day 2 weeks
 */
const scheduleToData = (schedule, oddMondayDate) => {
	const currentDate = new Date(oddMondayDate);

	const data = [];
	for (let index = 0; index < 14; index++) {
		data.push({
			date: {
				jsdate: new Date(currentDate),
				date: `${currentDate.getDate()} ${months[currentDate.getMonth()]}`,
				weekDay: weekDays[currentDate.getDay()]
			},
			lessons: []
		});
		currentDate.setDate(currentDate.getDate() + 1);
	}

	schedule.forEach(day => {
		data[day.order].lessons = day.lessons;
	});

	return data;
}

const fixDate = (date : Date) : [Date, number] => {
	if (!date) {
		date = new Date();
	}

	const _isOddWeek = isOddWeek(date);
	const currentDayInOrder = date.getDay() + (_isOddWeek ? 0 : 7);

	const oddMonday = new Date(date);
	oddMonday.setDate(oddMonday.getDate() - currentDayInOrder); // date of the odd monday

	return [oddMonday, currentDayInOrder];
}

const Schedule = ({ scheduleData }) => {

	/**
	 * if schedule data is null | undefined => display skeletons
	 */
	if (!scheduleData) {
		return <Layout>
			<Stack>
				<SkeletonEventCard customRef={null}/>
				<SkeletonEventCard customRef={null}/>
				<SkeletonEventCard customRef={null}/>
			</Stack>
		</Layout>;
	}


	const currentDate = useRef<Date>(new Date());
	const [oddMonday, currentDayInOrder] = fixDate(currentDate.current);
	const currentIndex = useRef(currentDayInOrder);

	const [data, updateData] = useState( scheduleToData(scheduleData, oddMonday) );


	/**
	 * called when one of the loaders appears in viewport
	 */
	const handleLoader = loaderType => {
		if (loaderType === 'upper') {
			const oddMondayDate = new Date(data[0].date.jsdate);
			oddMondayDate.setDate(oddMondayDate.getDate() - 14);

			currentIndex.current += 14;

			updateData( scheduleToData(scheduleData, oddMondayDate).concat(data) );
		} else {
			const oddMondayDate = new Date(data[data.length - 1].date.jsdate);
			oddMondayDate.setDate(oddMondayDate.getDate() + 1);

			updateData( data.concat( scheduleToData(scheduleData, oddMondayDate) ) );
		}
	}


	const onCurrentDateUpdate = (value : Date) => {
		currentDate.current = value;
		const [oddMonday, currentDayInOrder] = fixDate(currentDate.current);
		currentIndex.current = currentDayInOrder;

		updateData( scheduleToData(scheduleData, oddMonday) );
	}

	return (
		<ScheduleView
			scheduleData={ data }
			currentIndex={ currentIndex.current }
			handleLoader={ handleLoader }
			updateCurrentDate={ onCurrentDateUpdate }
			currentDate={ currentDate.current }/>
	);
}

export default Schedule;