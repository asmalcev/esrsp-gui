import AdminPageGenerator from '../../../src/AdminPageGenerator';
import { UsersContainer } from '../../../src/containers/admin/UserContainer';

const AdminUser = AdminPageGenerator({
	title: 'Управление пользователями',
	fetchUrl: '/api/users',
	ContainerComponent: UsersContainer,
});

export default AdminUser;
