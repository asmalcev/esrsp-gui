import {
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import Link from 'next/link';
import { Teacher } from '../../../backend.types';
import { StyledTableCell } from '../../../common/TableCell';
import { WideLayout } from '../../Layout';

const TeachersContainer = ({ data }: { data: Teacher[] }) => {
	const teachers = data.map((d) => (
		<TableRow key={d.id}>
			<StyledTableCell>{`${d.id}`}</StyledTableCell>
			<StyledTableCell>{d.fullname}</StyledTableCell>
			<StyledTableCell>
				<Link href={`/admin/teacher/${d.id}`}>Изменить</Link>
			</StyledTableCell>
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
							<StyledTableCell>action</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>{teachers}</TableBody>
				</Table>
			</TableContainer>
		</WideLayout>
	);
};

export default TeachersContainer;
