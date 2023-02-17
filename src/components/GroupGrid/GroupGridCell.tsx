import { styled, TableCell } from '@mui/material';
import { useRef, useState } from 'react';

import styles from './GroupGrid.styles';

const TextField = styled('input')(styles.input);

const GroupGridCell = ({
	children,
	editable,
	onChange,
	...props
}: {
	children: string;
	editable?: boolean;
	onChange?: (old: string, current: string) => void;
}) => {
	const [value, setValue] = useState(children || '');
	const [editMode, setEditMode] = useState(false);
	const savedValue = useRef<string>(value);

	const onClick = () => {
		if (editable && !editMode) {
			setEditMode(true);
		}
	};

	const onBlur = () => {
		setEditMode(false);
		if (savedValue.current !== value) {
			onChange && onChange(savedValue.current, value);
			savedValue.current = value;
		}
	};

	const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetValue = e.target.value;
		if (targetValue.length < 4) {
			setValue(targetValue);
		}
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onBlur();
		}
	};

	return (
		<TableCell {...props} onClick={onClick}>
			{editMode ? (
				<TextField
					onBlur={onBlur}
					onChange={_onChange}
					autoFocus={true}
					value={value}
					onKeyDown={onKeyDown}
					type="number"
				/>
			) : (
				value
			)}
		</TableCell>
	);
};

export default GroupGridCell;
