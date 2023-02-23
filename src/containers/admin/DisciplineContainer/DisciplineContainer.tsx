import AdminEditGenerator from '../AdminEditGenerator';

const StudentContainer = AdminEditGenerator({
	title: 'Управление дисциплинами',
	fields: {
		id: {
			disabled: true,
			type: 'string',
		},
		name: {
			type: 'string',
			validate: (v: string) => {
				if (v.length > 0) {
					return { isOk: true, error: '' };
				}
				return { isOk: false, error: 'name cannot be empty' };
			},
			prepare: (v: string) => v.trim(),
		},
	},
	fetchUrl: '/api/schedule/discipline/',
});

export default StudentContainer;
