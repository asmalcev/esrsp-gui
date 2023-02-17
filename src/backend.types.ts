export type Performance = {
	id: number;
	value: string;
	date: Date;
};

export type Teacher = {
	id: number;
	fullname: string;
};

export type Student = {
	id: number;
	fullname: string;
	recordBook: string;
	studentGroup?: StudentGroup;
	performance?: Performance[];
};

export type Discipline = {
	id: number;
	name: string;
};

export type LessonTime = {
	id: number;
	timeStart: string;
	timeEnd: string;
};

export type StudentGroup = {
	id: number;
	name: string;
};

export type Lesson = {
	id: number;
	studentGroups: StudentGroup[];
	teacher: Teacher;
	discipline: Discipline;
	lessonNumber: number;
	lessonDay: number;
	place: string;
};

export type TimedLesson = Lesson & { lessonTime?: LessonTime };

export type StudentGroupDiscipline = {
	discipline: string;
	disciplineId: number;
	studentGroup: string;
	studentGroupId: number;
};

export type StudentGroupPerformance = {
	studentGroup: StudentGroup;
	discipline: Discipline;
	table: (Student | string)[][];
};
