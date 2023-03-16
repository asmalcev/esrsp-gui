import { styled, Stack } from '@mui/material';

const InputBox = styled(Stack, { name: 'input-box' })(({ theme }) => ({
	margin: `${theme.spacing(4)} 0`,
}));

export default InputBox;
