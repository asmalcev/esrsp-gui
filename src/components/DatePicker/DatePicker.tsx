import { useState, createElement, FunctionComponent, ComponentClass } from 'react';

import { styled, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';

import ru_locale from 'dayjs/locale/ru';

import styles from './DatePicker.styles';

type DatePickerProps = {
	stdValue?: Date | string | number;

	label?: string;
	mask?: string;

	helperText?: string;

	onChangeHandler?: (newValue : any) => void;
}

const StyledMuiDatePicker = styled(MuiDatePicker)( styles.datePicker );

const DatePicker = ({
		mask,
		label,
		stdValue,
		helperText,
		onChangeHandler
	} : DatePickerProps) => {
	const [value, setValue] = useState<Date | string | number>(stdValue || new Date());
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onChange = newValue => {
		setValue(newValue);
		onChangeHandler && onChangeHandler(newValue);
	}

	/**
	 * DatePicker was done controlled component to except user keyboard input
	 */
	const onFocus = () => {
		setIsOpen(true);
	}

	const onOpen = () => {
		setIsOpen(true);
	}

	const onClose = () => {
		setIsOpen(false);
	}

	const getTextField = params => (
		<TextField
			{...params}
			color="secondary"
			helperText={ helperText }
			onFocus={ onFocus } />
	);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} locale={ru_locale}>
			<StyledMuiDatePicker
				label={ label || 'Выберите дату' }
				mask={ mask || '__.__.____'}
				value={ value }
				onChange={ onChange }
				open={ isOpen }
				onOpen={ onOpen }
				onClose={ onClose }
				renderInput={ getTextField }/>
		</LocalizationProvider>
	);
}

export default DatePicker;
