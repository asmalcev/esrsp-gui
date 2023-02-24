import { Stack, styled, Typography } from '@mui/material';

const _Footer = styled(Stack)(({ theme }) => ({
	padding: theme.spacing(2),
	backgroundColor: theme.palette.customBackground.footer,
}));

const Footer = () => {
	return (
		<_Footer direction="row" justifyContent="space-between">
			<Typography variant="subtitle1">&copy; Alexander Malcev</Typography>
			<Typography variant="subtitle1">v0.0.1</Typography>
		</_Footer>
	);
};

export default Footer;
