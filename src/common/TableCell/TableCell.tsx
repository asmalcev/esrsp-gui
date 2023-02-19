import { styled, TableCell as _TableCell } from '@mui/material';
import { useRef, useState } from 'react';

const TextField = styled('input')(({ theme }) => ({
	outline: 'none',

	width: theme.spacing(4),
	background: 'transparent',
	border: 'none',

	'&': {
		textAlign: 'center',
	},

	'&::-webkit-outer-spin-button': {
		WebkitAppearance: 'none',
	},
	'&::-webkit-inner-spin-button': {
		WebkitAppearance: 'none',
	},
}));

const inputFilter = new RegExp('(^[0-9]+$)|(^н$)');

const TableCell = ({
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

		/* valid value is empty string or string.length less than 4 and match regexp */
		if (
			targetValue.length === 0 ||
			(targetValue.length < 4 && inputFilter.test(targetValue))
		) {
			setValue(targetValue);
		}
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onBlur();
		}
	};

	return (
		<_TableCell {...props} onClick={onClick}>
			{editMode ? (
				<TextField
					onBlur={onBlur}
					onChange={_onChange}
					autoFocus={true}
					value={value}
					onKeyDown={onKeyDown}
				/>
			) : (
				value
			)}
		</_TableCell>
	);
};

export default TableCell;
