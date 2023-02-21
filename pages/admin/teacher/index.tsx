import AdminPageGenerator from '../../../src/AdminPageGenerator';
import TeacherContainer from '../../../src/containers/admin/TeacherContainer';

const AdminDiscipline = AdminPageGenerator({
	title: 'Управление преподавателями',
	fetchUrl: '/api/roles/teacher',
	ContainerComponent: TeacherContainer,
});

export default AdminDiscipline;
