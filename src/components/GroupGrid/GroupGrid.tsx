import {
	styled,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableBody
} from '@mui/material';

import styles from './GroupGrid.styles';
import { Student, StudentGroupPerformance } from "../../backend.types";
import GroupGridCell from './GroupGridCell';

const StyledTableCell = styled(GroupGridCell)(styles.cell);
const StickyTableCell = styled(StyledTableCell)(styles.sticky);
const StyledTableContainer: any = styled((props) => <TableContainer component={Paper} {...props}/>)(styles.tableContainer);
const StyledTableRow = styled(TableRow)(styles.row);

const GroupGrid = ({
	data
}: {
	data: StudentGroupPerformance;
}) => {
	const tableHead = [];
	const tableContent = [];

	for (let i = 0; i < data.table.length; i++) {
		if (i > 0) {
			tableContent.push([]);
		}

		for (let j = 0; j < data.table[i].length; j++) {
			let Component = StyledTableCell;
			let cell;
			if (j === 0) {
				const fullname = (data.table[i][j] as Student).fullname;
				cell = fullname && fullname.substring(0, fullname.lastIndexOf(' '));
				Component = StickyTableCell;
			} else {
				cell = data.table[i][j] as string;
			}

			if (i === 0) {
				tableHead.push((
					<Component key={`${i} ${j}`}>
						{ cell }
					</Component>
				));
			} else {
				tableContent[i - 1].push((
					<Component
						key={`${i} ${j}`}
						sx={{ textAlign: j === 0 ? 'left' : 'center' }}
					>
						{ cell }
					</Component>
				));
			}
		}
	}

	return (
		<StyledTableContainer className="styled-scroll">
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						{ tableHead }
					</TableRow>
				</TableHead>
				<TableBody>
					{ tableContent.map((row, i) => <StyledTableRow key={i}>{ row }</StyledTableRow>) }
				</TableBody>
			</Table>
		</StyledTableContainer>
	);
}

export default GroupGrid;