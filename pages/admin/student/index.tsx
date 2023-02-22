import AdminPageGenerator from '../../../src/AdminPageGenerator';
import { StudentsContainer } from '../../../src/containers/admin/StudentContainer';

const AdminDiscipline = AdminPageGenerator({
	title: 'Управление дисциплинами',
	fetchUrl: '/api/roles/student',
	ContainerComponent: StudentsContainer,
});

export default AdminDiscipline;
