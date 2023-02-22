import { styled, Button as MuiButton, ButtonProps } from '@mui/material';

const Button = styled((props: ButtonProps) => (
	<MuiButton color="secondary" variant="contained" {...props} />
))(({ theme }) => ({
	padding: theme.spacing(1),
	boxShadow: theme.boxShadow,
}));

export default Button;
