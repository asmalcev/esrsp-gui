import AdminPageGenerator from '../../../src/AdminPageGenerator';
import { TeachersContainer } from '../../../src/containers/admin/TeacherContainer';

const AdminDiscipline = AdminPageGenerator({
	title: 'Управление преподавателями',
	fetchUrl: '/api/roles/teacher',
	ContainerComponent: TeachersContainer,
});

export default AdminDiscipline;
