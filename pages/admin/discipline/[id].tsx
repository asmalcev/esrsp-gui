import { DisciplineContainer } from '../../../src/containers/admin/DisciplineContainer';
import AdminPageGenerator from '../../../src/AdminPageGenerator';

const AdminDisciplineOne = AdminPageGenerator({
	title: 'Управление дисциплинами',
	fetchUrl: '/api/schedule/discipline/[id]',
	ContainerComponent: DisciplineContainer,
	dynamicUrl: {
		router: ['id'],
	},
});

export default AdminDisciplineOne;
