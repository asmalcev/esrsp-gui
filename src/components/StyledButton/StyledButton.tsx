import { styled, Button, ButtonProps } from '@mui/material';

const StyledButton = styled((props: ButtonProps) => (
	<Button color="secondary" variant="contained" {...props} />
))(({ theme }) => ({
	padding: theme.spacing(1),
	boxShadow: theme.boxShadow,
}));

export default StyledButton;
