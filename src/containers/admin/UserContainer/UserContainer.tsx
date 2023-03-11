import AdminEditGenerator from '../AdminEditGenerator';

const UserContainer = AdminEditGenerator({
	title: 'Управление преподавателями',
	fields: {
		id: {
			disabled: true,
			type: 'string',
		},
		username: {
			type: 'string',
			disabled: true,
		},
		role: {
			type: 'string',
			disabled: true,
		},
		password: {
			type: 'generate',
			generate: async (data) => {
				const res = await fetch(`/api/users/${data.id}/update-password`);
				const { value } = await res.json();
				return value;
			},
			generateButtonText: 'Сгенерировать',
		},
	},
	fetchUrl: '/api/users/',
	hideSave: true,
});

export default UserContainer;
