import {
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { Teacher } from '../../../backend.types';
import { StyledTableCell } from '../../../common/TableCell';
import { WideLayout } from '../../Layout';

const TeachersContainer = ({ data }: { data: Teacher[] }) => {
	const teachers = data.map((d) => (
		<TableRow key={d.id}>
			<StyledTableCell>{`${d.id}`}</StyledTableCell>
			<StyledTableCell>{d.fullname}</StyledTableCell>
		</TableRow>
	));

	return (
		<WideLayout>
			<Typography variant="h2">Управление преподавателями</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableCell>id</StyledTableCell>
							<StyledTableCell>fullname</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>{teachers}</TableBody>
				</Table>
			</TableContainer>
		</WideLayout>
	);
};

export default TeachersContainer;
