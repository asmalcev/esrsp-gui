import {
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';

import { Discipline } from '../../backend.types';
import { StyledTableCell } from '../../common/TableCell';
import { getddmm } from '../../utils';

const PerformanceGrid = ({ data }: { data: Discipline }) => {
	const dates = data.performances.map((p) => (
		<StyledTableCell key={p.id}>{getddmm(new Date(p.date))}</StyledTableCell>
	));
	const performances = data.performances.map((p) => (
		<StyledTableCell key={p.id}>{p.value}</StyledTableCell>
	));

	return (
		<>
			<Typography variant="h2">{data.name}</Typography>
			{data?.performances.length === 0 ? (
				<Typography variant="subtitle1">Нет оценок</Typography>
			) : (
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<StyledTableCell>Дата</StyledTableCell>
								{dates}
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<StyledTableCell>Оценка</StyledTableCell>
								{performances}
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	);
};

export default PerformanceGrid;
