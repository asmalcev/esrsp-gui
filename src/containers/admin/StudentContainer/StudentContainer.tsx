import AdminEditGenerator from '../AdminEditGenerator';

const StudentContainer = AdminEditGenerator({
	title: 'Управление студентами',
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
		recordBook: {
			type: 'string',
			validate: (v: string) => {
				if (v.length > 0) {
					return { isOk: true, error: '' };
				}
				return { isOk: false, error: 'recordBook cannot be empty' };
			},
			prepare: (v: string) => v.trim(),
		},
	},
	fetchUrl: '/api/roles/student/',
});

export default StudentContainer;
