import {
	styled,
	Button,
	ButtonProps
} from "@mui/material";

const StyledButton = styled(
	(props : ButtonProps) =>
	<Button
		color="secondary"
		variant="contained"
		{...props}/>
)(
	({theme}) => ({
		padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
		boxShadow: theme.boxShadow
	})
);

export default StyledButton;