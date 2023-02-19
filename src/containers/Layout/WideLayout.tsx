import { styled } from '@mui/material';

import Layout from './Layout';

const WideLayout = styled(Layout)(({ theme }) => ({
	padding: theme.spacing(2),

	'&': {
		flexDirection: 'column',
		gap: theme.spacing(2),
	},
}));

export default WideLayout;
