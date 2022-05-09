import {
	styled,
	Grid
} from '@mui/material';

import styles from './GroupGrid.styles';

const GroupGrid = ({

}) => {

	const columns = ['Имя', '01.04', '01.08'];
	const rows = [
		['Александров Владимир', '', ''],
		['Билбиотеков Дмитрий', '4', ''],
	];


	const GridContainer = styled(Grid)( styles.gridContainer );

	const firstRowElements = columns.map(column => (
		<Grid
			item
			key={column}
			xs={1}
		>
			<b>{ column }</b>
		</Grid>
	));

	const otherRowsElements = rows.map((row, i) => row.map((cell, j) => (
		<Grid
			item
			key={`${i} ${j}`}
			xs={1}
		>
			{ cell }
		</Grid>
	)));

	return (
		<GridContainer
			container
			columns={columns.length}
			spacing={1}
		>
			{
				firstRowElements
			}
			{
				otherRowsElements
			}
		</GridContainer>
	);
}

export default GroupGrid;