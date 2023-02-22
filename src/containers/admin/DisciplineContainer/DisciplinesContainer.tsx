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
import { Discipline } from '../../../backend.types';
import { StyledTableCell } from '../../../common/TableCell';
import { WideLayout } from '../../Layout';

const DisciplinesContainer = ({ data }: { data: Discipline[] }) => {
	const disciplines = data.map((d) => (
		<TableRow key={d.id}>
			<StyledTableCell>{`${d.id}`}</StyledTableCell>
			<StyledTableCell>{d.name}</StyledTableCell>
			<StyledTableCell>
				<Link href={`/admin/discipline/${d.id}`}>Изменить</Link>
			</StyledTableCell>
		</TableRow>
	));

	return (
		<WideLayout>
			<Typography variant="h2">Управление дисциплинами</Typography>
			<TableContainer component={Paper} className="styled-scroll">
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableCell>id</StyledTableCell>
							<StyledTableCell>name</StyledTableCell>
							<StyledTableCell>action</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>{disciplines}</TableBody>
				</Table>
			</TableContainer>
		</WideLayout>
	);
};

export default DisciplinesContainer;
