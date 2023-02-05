export class Performance {
	id: number;
	value: string;
	date: Date;
}

export class Teacher {
	id: number;
	fullname: string;
}

export class Student {
	id: number;
	fullname: string;
	recordBook: string;
	studentGroup: StudentGroup;
	performance: Performance[];
}

export class Discipline {
	id: number;
	name: string;
}

export class LessonTime {
	id: number;
	timeStart: string;
	timeEnd: string;
}

export class StudentGroup {
	id: number;
	name: string;
}

export class Lesson {
	id: number;
	studentGroups: StudentGroup[];
	teacher: Teacher;
	discipline: Discipline;
	lessonNumber: number;
	lessonDay: number;
	place: string;
}

export type TimedLesson = (Lesson & { lessonTime?: LessonTime });