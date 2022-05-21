import {
	styled,
	Typography
} from '@mui/material';

import styles from './GroupGrid.styles';

const GroupGrid = ({

}) => {

	const columns = ['И597', '01.04', '01.08', '01.12', '01.16', '01.20', '01.24', '01.28', '02.02', '02.06', '02.10'];
	const rows = [
		['Александров Владимир', '', '', '', '3', '5', '', '', '4', '', ''],
		['Библиотеков Дмитрий', '4', '', '', '', '5', '', '', '3', '', ''],
		['Георгиев Антон', '', '4', '4', '', '', '5', '', '', '', ''],
	];
	// const columns = ['Имя', '01.04', '01.08'];
	// const rows = [
	// 	['Александров Владимир', '', '3'],
	// 	['Библиотеков Дмитрий', '4', ''],
	// ];

	const layoutProps = {
		columns: columns.length
	};

	const GridLayoutContainer = styled('div')( styles.gridLayout.bind(null, layoutProps) );
	const GridCell = styled('div')( styles.gridCell.bind(null, layoutProps) );

	const firstRowElements = columns.map(
		(
			column,
			index
		) => (
		<GridCell
			key={column}
		>
			{
				index === 0 ?
				( <Typography variant="h2">{ column }</Typography> ) :
				column
			}
		</GridCell>
	));

	const otherRowsElements = rows.map((row, i) => row.map((cell, j) => (
		<GridCell
			key={`${i} ${j}`}
		>
			{ cell }
		</GridCell>
	)));

	return <GridLayoutContainer>
		{
			firstRowElements
		}
		{
			otherRowsElements
		}
	</GridLayoutContainer>;
}

export default GroupGrid;