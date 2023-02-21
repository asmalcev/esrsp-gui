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
		text: 'Дисциплины',
		href: '/admin/discipline',
		compact: true,
	},
];
