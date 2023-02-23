import { styled, Stack } from "@mui/material";

const InputBox = styled(Stack)(({ theme }) => ({
	width: theme.spacing(40),
	margin: `${theme.spacing(4)} 0`,
}));

export default InputBox;