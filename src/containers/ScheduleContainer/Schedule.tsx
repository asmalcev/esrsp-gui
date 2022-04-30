import ScheduleView from "./ScheduleView";

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

const Schedule = ({ scheduleData }) => {
	console.log(scheduleData);

	const currentDate = new Date();
	const _isOddWeek = isOddWeek(currentDate);
	const currentDayInOrder = currentDate.getDay() + (_isOddWeek ? 0 : 7);
	console.log(currentDayInOrder);
	
	
	// return <ScheduleView scheduleData={scheduleData}/>
	return <p>hi</p>;
}

export default Schedule;