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
	useEffect,
} from 'react';

import Select from '../../common/Select';
import { jwtfetch } from '../../utils';

import styles from './GroupGrid.styles';
import StyledTooltip from '../StyledTooltip';


const selectValues = [
	'2', '3', '4', '5', 'н', 'Очистить'
];

const IconsContainer = styled(Stack)( styles.iconsContainer );
const CellInput = styled(Select)( styles.cellInput );
const FloatingStack = styled(Stack)( styles.floatingStack );

const GroupGrid = ({
	data
}) => {
	const router = useRouter();

	const [editMode, setEditMode] = useState<boolean>(false);
	const formRef = useRef(null);

	const columns = data.table.columnsRow;
	const rows = data.table.rows;

	const layoutProps = {
		columns: columns.length - 1
	};

	/**
	 * styled components
	 */
	const GridLayoutContainer = styled('form')( styles.gridLayout.bind(null, layoutProps) );
	const GridCell = styled('div')( styles.gridCell.bind(null, layoutProps) );

	const floatingColumnContent = [];

	const firstRowElements = columns.map(
		(
			column,
			index
		) => {
			if (index === 0) {
				floatingColumnContent.push((
					<GridCell key={column} className="first-column">
						<Typography variant="h2">{ column }</Typography>
					</GridCell>
				));

				return null;
			}

			return (
				<GridCell key={column}>
					{ column }
				</GridCell>
			);
		});

	const otherRowsElements = rows.map((row, i) => row.map((cell, j) => {
		if (j === 0) {
			floatingColumnContent.push((
				<GridCell
					key={`${i} ${j}`}
					className="first-column"
				>
					{ cell }
				</GridCell>
			));

			return null;
		}

		if (!editMode) {
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



	const computeDiff = () => {
		/**
		 * compute all academic performance that already exists in the table
		 */
		 const initialCells = data.table.rows.map(
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

				const startTableIndex = initialCells.findIndex(
					cell => cell.indexes[0] == indexes[0] && cell.indexes[1] == (indexes[1] - 1)
				);
				if (startTableIndex > -1) {
					/**
					 * if there is already exists element in start table
					 */
					if (initialCells[startTableIndex].value === input.value) {
						/**
						 * if the same value => null to filter
						 */
						 initialCells.splice(startTableIndex, 1);
						return null;
					} else {
						/**
						 * if value changed => return update request
						 */
						initialCells.splice(startTableIndex, 1);
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
			initialCells.map(cell => {
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

		return formDiff;
	}



	const checkUnsavedData = () => {
		if (!formRef.current) {
			return;
		}

		const formDiff = computeDiff();

		if (formDiff.length) {
			/**
			 * if there are unsaved changes
			 */
			const shouldSave = confirm('Несохраненные данные будут потеряны. Сохранить?');

			if (shouldSave) {
				jwtfetch('/api/academicperformance', {
					data: formDiff,
					disciplineid: router.query?.disciplineid
				});
			}
		}
	}

	/**
	 * Router event handlers
	 */
	useEffect(() => {
		router.events.on('routeChangeStart', checkUnsavedData);

		// const browserUnsavedCheck = e => {
		// 	const formDiff = computeDiff();

		// 	if (formDiff.length) {
		// 		e.preventDefault();
		// 		e.returnValue = '';
		// 	}
		// }

		// window.addEventListener('beforeunload', browserUnsavedCheck);

		return () => {
			router.events.off('routeChangeStart', checkUnsavedData);
			// window.removeEventListener('beforeunload', browserUnsavedCheck);
		}
	}, []);



	/**
	 * Event handlers
	 */
	const saveData = () => {
		const formDiff = computeDiff();

		if (formDiff.length) {
			jwtfetch('/api/academicperformance', {
				data: formDiff,
				disciplineid: router.query?.disciplineid
			});
		}
	}

	const onEditButtonClick = e => {
		if (editMode) {
			saveData();
		}
		setEditMode(!editMode);
	}

	const onSaveButtonClick = e => {
		e.preventDefault();

		saveData();
		setEditMode(false);
	}

	const onCancelButtonClick = e => {
		const shouldCancel = confirm('Вся несохраненная информация удалится. Продолжить?');

		if (shouldCancel) {
			setEditMode(false);
		}
	}

	return <>
		<Stack flexDirection="row">
			<FloatingStack>
				{
					floatingColumnContent
				}
			</FloatingStack>
			<GridLayoutContainer
				className="styled-scroll"
				ref={editMode ? formRef : null}
			>
				{
					firstRowElements
				}
				{
					otherRowsElements
				}
			</GridLayoutContainer>
		</Stack>
		<IconsContainer spacing={2}>
			{
				editMode ? (<>
					<StyledTooltip
						title="Сохранить"
						placement="left">
						<IconButton
							onClick={ onSaveButtonClick }
							type="submit"
							color="secondary"
						>
							<Icon>save</Icon>
						</IconButton>
					</StyledTooltip>
					<StyledTooltip
						title="Отменить"
						placement="left">
						<IconButton
							onClick={ onCancelButtonClick }
							type="submit"
						>
							<Icon>close</Icon>
						</IconButton>
					</StyledTooltip>
				</>) : (
					<StyledTooltip
						title="Редактировать"
						placement="left">
						<IconButton
							onClick={ onEditButtonClick }
						>
							<Icon>edit</Icon>
						</IconButton>
					</StyledTooltip>
				)
			}
		</IconsContainer>
	</>;
}

export default GroupGrid;