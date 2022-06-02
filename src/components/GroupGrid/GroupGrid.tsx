import { useRouter } from 'next/router';

import {
	styled,
	Typography,
	IconButton,
	Icon,
	Stack,
	MenuItem
} from '@mui/material';

import {
	useState,
	useRef,
} from 'react';

import Select from '../../common/Select';
import { jwtfetch } from '../../utils';

import styles from './GroupGrid.styles';
import StyledTooltip from '../StyledTooltip';


const selectValues = [
	'2', '3', '4', '5', 'н', 'Очистить'
];

const GroupGrid = ({
	data
}) => {
	const router = useRouter();

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
	}));


	const onEditButtonClick = e => {
		setEditMode(!editMode);
	}

	const onSaveButtonClick = e => {
		e.preventDefault();

		/**
		 * compute all academic performance that already exists in the table
		 */
		filledCells.current = data.table.rows.map(
			(row, i) => row.slice(1).map(
				(cell, j) => ({
					indexes: [i, j],
					value: cell
				})
			).filter(cell => cell.value.length)
		).filter(row => row.length).flat(1);

		/**
		 * compute difference between start table state and now
		 */
		const formDiff = Array.from(
			formRef.current.elements
		).filter((input : HTMLInputElement) => input.value)
		 .map((input : HTMLInputElement) => {
				const indexes = input.name.split(' ').map(val => Number(val));
				const reversedDate = columns[indexes[1]].split('.');
				reversedDate.reverse();

				const dateString = `2022.${reversedDate.join('.')}`;
				const studentid = data.rawGroup[indexes[0]].id;

				const startTableIndex = filledCells.current.findIndex(
					cell => cell.indexes[0] == indexes[0] && cell.indexes[1] == (indexes[1] - 1)
				);
				if (startTableIndex > -1) {
					/**
					 * if there is already exists element in start table
					 */
					if (filledCells.current[startTableIndex].value === input.value) {
						/**
						 * if the same value => null to filter
						 */
						 filledCells.current.splice(startTableIndex, 1);
						return null;
					} else {
						/**
						 * if value changed => return update request
						 */
						filledCells.current.splice(startTableIndex, 1);
						data.table.rows[indexes[0]][indexes[1]] = input.value;
						return {
							method: 'update',
							studentid: studentid,
							value: input.value,
							date: dateString
						}
					}
				}

				data.table.rows[indexes[0]][indexes[1]] = input.value;
				return {
					method: 'insert',
					studentid: studentid,
					value: input.value,
					date: dateString
				};
		 }).filter(el => el).concat(
			/**
			 * all the elements that remain in start array has been deleted => need to add them like diff 'delete'
			 */
			filledCells.current.map(cell => {
				const reversedDate = columns[cell.indexes[1] + 1].split('.');
				reversedDate.reverse();
	
				const dateString = `2022.${reversedDate.join('.')}`;
				const studentid = data.rawGroup[cell.indexes[0]].id;
	
				data.table.rows[cell.indexes[0]][cell.indexes[1] + 1] = '';
				return {
					method: 'delete',
					date: dateString,
					studentid: studentid
				}
			})
		 );

		if (formDiff.length) {
			jwtfetch('/api/academicperformance', {
				data: formDiff,
				disciplineid: router.query?.disciplineid
			});
		}
		setEditMode(!editMode);
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
			<StyledTooltip
				title="Редактировать"
				placement="left">
				<IconButton
					onClick={onEditButtonClick}
					color={editMode ? 'secondary' : 'default'}
					sx={{
						backgroundColor: editMode ? 'rgba(0, 0, 0, 0.04)' : ''
					}}>
					<Icon>edit</Icon>
				</IconButton>
			</StyledTooltip>
			{
				editMode &&
				<StyledTooltip
					title="Сохранить"
					placement="left">
					<IconButton
						onClick={onSaveButtonClick}
						type="submit"
						color="secondary">
						<Icon>save</Icon>
					</IconButton>
				</StyledTooltip>
			}
		</IconsContainer>
	</>;
}

export default GroupGrid;