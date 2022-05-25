import { useRef, useState } from "react";
import ScheduleView from "./ScheduleView";

import { SkeletonEventCard } from "../../components/EventCard";
import Layout from "../Layout";
import { Stack } from "@mui/material";

import { months, weekDays } from "./dateData";

const isOddWeek = (date : Date) : Boolean => {
	const startDate = new Date(date.getFullYear(), 0, 1);
	const days = Math.floor(
		(date.getTime() - startDate.getTime()) / // diff in ms
		(24 * 60 * 60 * 1000)
	);

	const weekNumber = Math.ceil(
		(date.getDay() + 1 + days) / 7);

	return Boolean(weekNumber % 2);
}

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

const Schedule = ({ scheduleData }) => {

	if (!scheduleData) {
		return <Layout>
			<Stack>
				<SkeletonEventCard customRef={null}/>
				<SkeletonEventCard customRef={null}/>
				<SkeletonEventCard customRef={null}/>
			</Stack>
		</Layout>;
	}

	const [currentDate, setCurrentDate] = useState(new Date());
	const _isOddWeek = isOddWeek(currentDate);
	const currentDayInOrder = currentDate.getDay() + (_isOddWeek ? 0 : 7);

	currentDate.setDate(currentDate.getDate() - currentDayInOrder + 1); // date of the odd monday

	const [data, updateData] = useState( scheduleToData(scheduleData, currentDate) );
	const currentIndex = useRef(currentDayInOrder);

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

	const handleCurrentDateUpdate = (value : Date) => {
		setCurrentDate(value);
		updateData( scheduleToData(scheduleData, currentDate) );
	}

	return (
		<ScheduleView
			scheduleData={ data }
			currentIndex={ currentIndex.current - 1 }
			handleLoader={ handleLoader }
			updateCurrentDate={ handleCurrentDateUpdate }
			currentDate={ currentDate }/>
	);
}

export default Schedule;