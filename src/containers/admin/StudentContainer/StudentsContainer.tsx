import {
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { Student } from '../../../backend.types';
import { StyledTableCell } from '../../../common/TableCell';
import { WideLayout } from '../../Layout';

const StudentsContainer = ({ data }: { data: Student[] }) => {
	const students = data.map((d) => (
		<TableRow key={d.id}>
			<StyledTableCell>{`${d.id}`}</StyledTableCell>
			<StyledTableCell>{d.fullname}</StyledTableCell>
			<StyledTableCell>{d.recordBook}</StyledTableCell>
		</TableRow>
	));

	return (
		<WideLayout>
			<Typography variant="h2">Управление студентами</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableCell>id</StyledTableCell>
							<StyledTableCell>fullname</StyledTableCell>
							<StyledTableCell>recordBook</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>{students}</TableBody>
				</Table>
			</TableContainer>
		</WideLayout>
	);
};

export default StudentsContainer;
