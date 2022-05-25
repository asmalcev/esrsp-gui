import {
	styled,
	TextField,
	TextFieldProps
} from "@mui/material";

const StyledTextField = styled(
	(props : TextFieldProps) =>
		<TextField
			color="secondary"
			{...props}/>
)(
	({theme}) => ({

	})
)

export default StyledTextField;