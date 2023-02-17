import { styled } from '@mui/system';

const Layout = styled('div')(({ theme }) => ({
	display: 'flex',

	paddingLeft: theme.spacing(22),

	'&': {
		position: 'relative',
	},
}));

export default Layout;
