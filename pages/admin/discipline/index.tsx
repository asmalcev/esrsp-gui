import { DisciplinesContainer } from '../../../src/containers/admin/DisciplineContainer';
import AdminPageGenerator from '../../../src/AdminPageGenerator';

const AdminDiscipline = AdminPageGenerator({
	title: 'Управление дисциплинами',
	fetchUrl: '/api/schedule/discipline',
	ContainerComponent: DisciplinesContainer,
});

export default AdminDiscipline;
