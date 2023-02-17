import { styled, TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent } from 'react';

type StyledTextFieldProps = Omit<TextFieldProps, 'onChange'> & {
	onChange?: (val: string) => void;
};

const Field = styled(TextField)(({ theme }) => ({}));

const StyledTextField = (props: StyledTextFieldProps) => {
	const { onChange, ...other } = props;

	const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		onChange && onChange(value);
	};

	return (
		<Field
			onChange={onFieldChange}
			color="secondary"
			{...(other as TextFieldProps)}
		/>
	);
};

export default StyledTextField;
