import {
	styled,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableBody,
} from '@mui/material';

import { useState } from 'react';

import styles from './GroupGrid.styles';
import {
	Student,
	StudentGroupPerformance,
	Performance,
} from '../../backend.types';
import GroupGridCell from './GroupGridCell';
import { getMethodFromDiff, toLocalISOTime } from '../../utils';
import {
	NextTableWithUpdateInput,
	TableSize,
	UpdateTableInfo,
} from './GroupGrid.types';

const StyledTableCell = styled(GroupGridCell)(styles.cell);
const StickyTableCell = styled(StyledTableCell)(styles.sticky);
const StyledTableContainer: any = styled((props) => (
	<TableContainer component={Paper} {...props} />
))(styles.tableContainer);
const StyledTableRow = styled(TableRow)(styles.row);

const nextTableWithUpdate = (
	table: (Student | Performance)[][],
	update: NextTableWithUpdateInput,
) => {
	const nextTable = [];

	for (let i = 0; i < table.length; i++) {
		nextTable.push([]);
		for (let j = 0; j < table[i].length; j++) {
			if (update.row === i && update.column === j) {
				nextTable[i].push(update.performance);
			} else {
				nextTable[i].push(table[i][j]);
			}
		}
	}

	return nextTable;
};

const GroupGrid = ({
	data,
	size = TableSize.medium,
}: {
	data: StudentGroupPerformance;
	size?: TableSize;
}) => {
	const [table, setTable] = useState(data.table);

	const updateTable = async (
		info: UpdateTableInfo,
		old: string,
		current: string,
	) => {
		const method = getMethodFromDiff(old, current);

		if (!info.id) {
			const currentYear = new Date().getFullYear();
			const mmddDate = data.tableHead[info.column]
				.split('.')
				.reverse()
				.join('.');
			const date = toLocalISOTime(new Date(`${mmddDate}.${currentYear}`));
			const student = data.table[info.row][0];

			const body = {
				value: current,
				date,
				studentId: student.id,
				disciplineId: data.discipline.id,
			};

			const res = await fetch(`/api/performance`, {
				method,
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (res.status !== 201) {
				console.log('Error:', res);
			} else {
				const jsonRes: Performance = await res.json();
				setTable(
					nextTableWithUpdate(table, {
						...info,
						performance: jsonRes,
					}),
				);
			}
		}

		if (method === 'DELETE') {
			const res = await fetch(`/api/performance/${info.id}`, {
				method,
			});

			if (res.status !== 200) {
				console.log('Error:', res);
			} else {
				setTable(
					nextTableWithUpdate(table, {
						...info,
						performance: null,
					}),
				);
			}
		}

		if (method === 'PUT') {
			const body = {
				value: current,
			};

			const res = await fetch(`/api/performance/${info.id}`, {
				method,
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (res.status !== 200) {
				console.log('Error:', res);
			} else {
				const performance = table[info.row][info.column] as Performance;
				performance.value = current;

				setTable(
					nextTableWithUpdate(table, {
						...info,
						performance,
					}),
				);
			}
		}
	};

	const tableHead = data.tableHead.map((cell, i) => (
		<GroupGridCell key={i}>{cell}</GroupGridCell>
	));
	const tableContent = [];

	for (let i = 0; i < table.length; i++) {
		tableContent.push([]);

		for (let j = 0; j < table[i].length; j++) {
			const currentElement = table[i][j];

			if (j === 0) {
				const fullname = (currentElement as Student).fullname;
				const cell =
					fullname && fullname.substring(0, fullname.lastIndexOf(' '));

				tableContent[i].push(
					<StickyTableCell key={`${i} ${j}`} sx={{ textAlign: 'left' }}>
						{cell}
					</StickyTableCell>,
				);
			} else {
				const performance = currentElement as Performance;
				const cell = performance?.value;

				tableContent[i].push(
					<StyledTableCell
						key={`${i} ${j}`}
						sx={{ textAlign: 'center' }}
						editable={true}
						onChange={updateTable.bind(null, {
							column: j,
							row: i,
							id: performance?.id,
						})}
					>
						{cell}
					</StyledTableCell>,
				);
			}
		}
	}

	return (
		<StyledTableContainer className="styled-scroll">
			<Table stickyHeader size={size}>
				<TableHead>
					<TableRow>{tableHead}</TableRow>
				</TableHead>
				<TableBody>
					{tableContent.map((row, i) => (
						<StyledTableRow key={i}>{row}</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</StyledTableContainer>
	);
};

export default GroupGrid;
