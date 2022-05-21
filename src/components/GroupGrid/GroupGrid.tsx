import {
	styled,
	Typography
} from '@mui/material';

import styles from './GroupGrid.styles';

const GroupGrid = ({
	data
}) => {

	const columns = data.table.columnsRow;
	const rows = data.table.rows;

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