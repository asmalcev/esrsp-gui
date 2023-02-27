import { useState } from 'react';

import { styled, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDevice } from '../../contexts/DeviceContext';

import ru_locale from 'dayjs/locale/ru';

import styles from './DatePicker.styles';

type DatePickerProps = {
	stdValue?: Date | string | number;

	label?: string;
	mask?: string;

	helperText?: string;

	onChangeHandler?: (newValue: any) => void;
};

const StyledMuiDatePicker = styled(MuiDatePicker)(styles.datePicker);

const DatePicker = ({
	mask,
	label,
	stdValue,
	helperText,
	onChangeHandler,
}: DatePickerProps) => {
	const { isSmallDevice } = useDevice();
	const [value, setValue] = useState<Date | string | number>(
		stdValue || new Date(),
	);
	const [open, setOpen] = useState<boolean>(false);

	const onChange = (newValue) => {
		setValue(newValue);
		onChangeHandler && onChangeHandler(newValue);
	};

	/**
	 * DatePicker was done controlled component to except user keyboard input
	 */
	const onInputFocus = () => {
		setOpen(true);
	};

	const onOpen = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	const onAccept = () => {
		setOpen(false);
	};

	const onInputKeyDown = (e) => {
		e.preventDefault();
	};

	const onInputMouseDown = (e) => {
		e.preventDefault();
		setOpen(true);
	};

	const onInputContextMenu = (e) => {
		e.preventDefault();
	};

	const getTextField = (params) => (
		<TextField
			{...params}
			color="secondary"
			helperText={helperText}
			onFocus={onInputFocus}
			onKeyDown={onInputKeyDown}
			onMouseDown={onInputMouseDown}
			onContextMenu={onInputContextMenu}
			sx={isSmallDevice && { width: 120 }}
			size={isSmallDevice && 'small'}
		/>
	);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} locale={ru_locale}>
			<StyledMuiDatePicker
				label={label}
				mask={mask || '__.__.____'}
				value={value}
				onChange={onChange}
				open={open}
				onOpen={onOpen}
				onClose={onClose}
				onAccept={onAccept}
				renderInput={getTextField}
			/>
		</LocalizationProvider>
	);
};

export default DatePicker;
