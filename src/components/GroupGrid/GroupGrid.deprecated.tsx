import {
	styled,
	Grid,
	Stack
} from '@mui/material';

import styles from './GroupGrid.styles';

const GroupGrid = ({

}) => {

	const columns = ['Имя', '01.04', '01.08', '01.12', '01.16', '01.20', '01.24', '01.28', '02.02', '01.04', '01.08', '01.12', '01.16', '01.20', '01.24', '01.28', '02.02'];
	const rows = [
		['Александров Владимир', '', '', '', '3', '5', '', '', '4', '', '', '', '3', '5', '', '', '4'],
		['Библиотеков Дмитрий', '4', '', '', '', '5', '', '', '3', '', '', '', '3', '5', '', '', '4'],
	];
	// const columns = ['Имя', '01.04', '01.08'];
	// const rows = [
	// 	['Александров Владимир', '', '3'],
	// 	['Библиотеков Дмитрий', '4', ''],
	// ];

	const GridLayoutContainer = styled('div')( styles.gridLayout );
	const OverflowContainer = styled('div')( styles.overflowContainer );
	const FirstColumnContainer = styled(Stack)( styles.firstColumnContainer );
	const GridContainer = styled(Grid)( styles.gridContainer );
	const GridCell = styled(Grid)( styles.gridCell );

	const firstRowElements = columns.map(column => (
		<GridCell
			item
			key={column}
			xs={1}
		>
			<b>{ column }</b>
		</GridCell>
	));

	const otherRowsElements = rows.map((row, i) => row.map((cell, j) => (
		<GridCell
			item
			key={`${i} ${j}`}
			xs={1}
		>
			{ cell }
		</GridCell>
	)));

	return <GridLayoutContainer>
		<FirstColumnContainer>
			{
				firstRowElements[0]
			}
			{
				otherRowsElements.map(row => row[0])
			}
		</FirstColumnContainer>
		<OverflowContainer>
			<GridContainer
				container
				columns={columns.length - 1}
				spacing={1}
				flexWrap="nowrap"
			>
				{
					firstRowElements.slice(1)
				}
				{
					otherRowsElements.map(row => row.slice(1))
				}
			</GridContainer>
		</OverflowContainer>
	</GridLayoutContainer>;
}

export default GroupGrid;