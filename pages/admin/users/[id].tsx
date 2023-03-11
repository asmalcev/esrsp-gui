import AdminPageGenerator from '../../../src/AdminPageGenerator';
import { UserContainer } from '../../../src/containers/admin/UserContainer';

const AdminUserOne = AdminPageGenerator({
	title: 'Управление пользователями',
	fetchUrl: '/api/users/[id]',
	ContainerComponent: UserContainer,
	dynamicUrl: {
		router: ['id'],
	},
});

export default AdminUserOne;
