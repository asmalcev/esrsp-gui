import { styled, TableCell } from "@mui/material";
import { useState } from "react";

import styles from './GroupGrid.styles';

const TextField = styled('input')( styles.input );

const GroupGridCell = ({
	children,
	...props
}: {
	children: string;
}) => {
	const [value, setValue] = useState(children);
	const [editMode, setEditMode] = useState(false);

	const onClick = () => {
		if (!editMode) {
			setEditMode(true);
		}
	}

	const onBlur = () => {
		setEditMode(false);
	}

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetValue = e.target.value;
		if (targetValue.length < 4) {
			setValue(targetValue);
		}
	}

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setEditMode(false);
		}
	}

	return (
		<TableCell {...props}
			onClick={ onClick }
		>
			{
				editMode
				?
					<TextField
						onBlur={ onBlur }
						onChange={ onChange }
						autoFocus={ true }
						value={ value }
						onKeyDown={ onKeyDown }
						type='number'
					/>
				:
					value
			}
		</TableCell>
	);
};

export default GroupGridCell;