import AdminPageGenerator from '../../../src/AdminPageGenerator';
import { TeacherContainer } from '../../../src/containers/admin/TeacherContainer';

const AdminTeacherOne = AdminPageGenerator({
	title: 'Управление преподавателями',
	fetchUrl: '/api/roles/teacher/[id]',
	ContainerComponent: TeacherContainer,
	dynamicUrl: {
		router: ['id'],
	},
});

export default AdminTeacherOne;
