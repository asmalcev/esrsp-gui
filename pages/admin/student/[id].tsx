import AdminPageGenerator from '../../../src/AdminPageGenerator';
import { StudentContainer } from '../../../src/containers/admin/StudentContainer';

const AdminStudentOne = AdminPageGenerator({
	title: 'Управление дисциплинами',
	fetchUrl: '/api/roles/student/[id]',
	ContainerComponent: StudentContainer,
	dynamicUrl: {
		router: ['id'],
	},
});

export default AdminStudentOne;
