import {
	styled,
	TextField as MuiTextField,
	TextFieldProps,
} from '@mui/material';
import { ChangeEvent } from 'react';

type StyledTextFieldProps = Omit<TextFieldProps, 'onChange'> & {
	onChange?: (val: string) => void;
};

const Field = styled(MuiTextField)(({ theme }) => ({}));

const TextField = (props: StyledTextFieldProps) => {
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

export default TextField;
