import AdminPageGenerator from '../../../src/AdminPageGenerator';
import StudentContainer from '../../../src/containers/admin/StudentContainer';

const AdminDiscipline = AdminPageGenerator({
	title: 'Управление дисциплинами',
	fetchUrl: '/api/roles/student',
	ContainerComponent: StudentContainer,
});

export default AdminDiscipline;
