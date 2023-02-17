import { TimedLesson } from '../../backend.types';

export type ScheduleData = {
	date: {
		jsdate: Date;
		date: string;
		weekDay: string;
	};
	lessons: TimedLesson[];
};
