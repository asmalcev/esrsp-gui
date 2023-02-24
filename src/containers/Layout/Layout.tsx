import { styled } from '@mui/system';
import { useDevice } from '../../contexts/DeviceContext';

const _Layout = styled('div')(({ theme }) => ({
	display: 'flex',

	paddingLeft: theme.spacing(22),

	'&': {
		position: 'relative',
	},
}));

const MobileLayout = styled('div')(({ theme }) => ({
	display: 'flex',

	'&': {
		position: 'relative',
	},
}));

const Layout = props => {
	const { isSmallDevice } = useDevice();

	if (isSmallDevice) {
		return <MobileLayout {...props}/>;
	} else {
		return <_Layout {...props}/>;
	}
}

export default Layout;
