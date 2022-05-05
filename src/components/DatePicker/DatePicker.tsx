import { useState } from 'react';

import { styled, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';

import ru_locale from 'dayjs/locale/ru';

import styles from './DatePicker.styles';

interface DatePickerProps {
	label?: string;
	mask?: string;

	helperText?: string;
	showHelperText?: boolean;

	onChangeHandler?: (newValue : Date | string | number) => {};
}

const DatePicker = ({
		label,
		mask,
		helperText,
		showHelperText,
		onChangeHandler
	} : DatePickerProps) => {
	const [value, setValue] = useState<Date | string | number>(new Date());

	const onChange = newValue => {
		setValue(newValue);
		onChangeHandler && onChangeHandler(newValue);
	}

	const StyledMuiDatePicker = styled(MuiDatePicker)( styles.datePicker );

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} locale={ru_locale}>
			<StyledMuiDatePicker
				label={ label || 'Выберите дату' }
				mask={ mask || '__.__.____'}
				value={ value }
				onChange={ onChange }
				okText={'ОК'}
				renderInput={(params) =>
					<TextField
						{...params}
						color="secondary"
						helperText={(showHelperText || false) && (helperText || 'дд.мм.гггг')} />
				}/>
		</LocalizationProvider>
	);
}

export default DatePicker;
