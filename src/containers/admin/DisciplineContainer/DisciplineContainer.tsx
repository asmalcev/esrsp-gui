import {
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { Discipline } from '../../../backend.types';
import StyledTableCell from '../../../common/TableCell';
import { WideLayout } from '../../Layout';

const DisciplineContainer = ({ data }: { data: Discipline[] }) => {
	const disciplines = data.map((d) => (
		<TableRow key={d.id}>
			<StyledTableCell>{`${d.id}`}</StyledTableCell>
			<StyledTableCell>{d.name}</StyledTableCell>
		</TableRow>
	));

	return (
		<WideLayout>
			<Typography variant="h2">Управление дисциплинами</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableCell>id</StyledTableCell>
							<StyledTableCell>name</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{disciplines}
					</TableBody>
				</Table>
			</TableContainer>
		</WideLayout>
	);
};

export default DisciplineContainer;
