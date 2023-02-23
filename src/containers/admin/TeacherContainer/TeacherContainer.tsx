import AdminEditGenerator from '../AdminEditGenerator';

const TeacherContainer = AdminEditGenerator({
	title: 'Управление преподавателями',
	fields: {
		id: {
			disabled: true,
			type: 'string',
		},
		fullname: {
			type: 'string',
			validate: (v: string) => {
				if (v.length > 0) {
					return { isOk: true, error: '' };
				}
				return { isOk: false, error: 'fullname cannot be empty' };
			},
			prepare: (v: string) => v.trim(),
		},
	},
	fetchUrl: '/api/roles/teacher/',
});

export default TeacherContainer;
