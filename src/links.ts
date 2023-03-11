export type LinkData = {
	text: string;
	href: string;
	compact?: boolean;
};

export const userLinksData: LinkData[] = [
	{
		text: 'Расписание',
		href: '/schedule',
	},
];

export const teacherLinksData: LinkData[] = [
	{
		text: 'Список групп',
		href: '/groups',
	},
];

export const studentLinksData: LinkData[] = [
	{
		text: 'Успеваемость',
		href: '/performance',
	},
];

export const adminLinksData: LinkData[] = [
	{
		text: 'Управление данными',
		href: '/admin',
	},
	{
		text: 'Загрузка',
		href: '/admin/upload',
		compact: true,
	},
	{
		text: 'Пользователи',
		href: '/admin/users',
		compact: true,
	},
	{
		text: 'Дисциплины',
		href: '/admin/discipline',
		compact: true,
	},
	{
		text: 'Преподаватели',
		href: '/admin/teacher',
		compact: true,
	},
	{
		text: 'Студенты',
		href: '/admin/student',
		compact: true,
	},
];
