import {
	styled,
	Typography,
	IconButton,
	Icon,
	TextField,
	Stack,
	MenuItem
} from '@mui/material';

import {
	useState,
	useRef,
	useEffect,
} from 'react';

import Select from '../../common/Select';

import styles from './GroupGrid.styles';


const selectValues = [
	'2', '3', '4', '5', 'н', 'Очистить'
];

const GroupGrid = ({
	data
}) => {

	const [editMode, setEditMode] = useState<boolean>(false);
	const formRef = useRef(null);
	const filledCells = useRef(null);

	const columns = data.table.columnsRow;
	const rows = data.table.rows;

	const layoutProps = {
		columns: columns.length
	};

	const GridLayoutContainer = styled('form')( styles.gridLayout.bind(null, layoutProps) );
	const GridCell = styled('div')( styles.gridCell.bind(null, layoutProps) );
	const IconsContainer = styled(Stack)( styles.iconsContainer );
	// const CellInput = styled(TextField)( styles.cellInput );
	const CellInput = styled(Select)( styles.cellInput );

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

	const otherRowsElements = rows.map((row, i) => row.map((cell, j) => {
		if (!editMode || j === 0) {
			return (
				<GridCell
					key={`${i} ${j}`}
				>
					{ cell }
				</GridCell>
			);
		}

		/**
		 * now done with select with no validation
		 */

		const shouldClear = (value : string) : boolean => value === 'Очистить';

		return (
			<GridCell
				key={`${i} ${j}`}
			>
				<CellInput
					variant="standard"
					color="secondary"
					name={`${i} ${j}`}
					selectValue={cell}
					shouldClear={shouldClear}
				>
					{
						selectValues.map(value => (
							<MenuItem
								key={value}
								value={value}
							>{value}</MenuItem>
						))
					}
				</CellInput>
			</GridCell>
		);
		// return (
		// 	<GridCell
		// 		key={`${i} ${j}`}
		// 	>
		// 		<CellInput
		// 			variant="standard"
		// 			color="secondary"
		// 			name={`${i} ${j}`}
		// 		>
		// 			{ cell }
		// 		</CellInput>
		// 	</GridCell>
		// );
	}));


	// useEffect(() => {
	// 	filledCells.current = Array.from(
	// 		formRef.current.elements
	// 	).filter((input : HTMLInputElement) => input.value)
	// 	 .map((input : HTMLInputElement) => {
	// 			const indexes = input.name.split(' ').map(val => Number(val));

	// 			return {
	// 				indexes: indexes,
	// 				delete: true
	// 			};
	// 	 });
	// }, []);


	const onEditButtonClick = e => {
		setEditMode(!editMode);
	}

	const onSaveButtonClick = e => {
		e.preventDefault();

		const formData = Array.from(
			formRef.current.elements
		).filter((input : HTMLInputElement) => input.value)
		 .map((input : HTMLInputElement) => {
				const indexes = input.name.split(' ').map(val => Number(val));

				return {
					studentid: data.rawGroup[indexes[0]].id,
					value: input.value,
					date: `${columns[indexes[1]]}.2022`
				};
		 });

		console.log(formData);
	}

	return <>
		<GridLayoutContainer className="styled-scroll" ref={formRef}>
			{
				firstRowElements
			}
			{
				otherRowsElements
			}
		</GridLayoutContainer>
		<IconsContainer spacing={2}>
			<IconButton
				onClick={onEditButtonClick}
				color={editMode ? 'secondary' : 'default'}
				sx={{
					backgroundColor: editMode ? 'rgba(0, 0, 0, 0.04)' : ''
				}}>
				<Icon>edit</Icon>
			</IconButton>
			{
				editMode &&
				<IconButton
					onClick={onSaveButtonClick}
					type="submit"
					color="secondary">
					<Icon>save</Icon>
				</IconButton>
			}
		</IconsContainer>
	</>;
}

export default GroupGrid;