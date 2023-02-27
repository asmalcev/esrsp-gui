import { styled } from '@mui/system';
import { useDevice } from '../../contexts/DeviceContext';

const _Layout = styled('div', { name: 'layout' })(({ theme }) => ({
	display: 'flex',

	paddingLeft: theme.spacing(22),

	'&': {
		position: 'relative',
	},
}));

const MobileLayout = styled('div', { name: 'mobile-layout' })(({ theme }) => ({
	display: 'flex',

	'&': {
		position: 'relative',
	},
}));

const Layout = (props) => {
	const { _ref, ...other } = props;
	const { isSmallDevice } = useDevice();

	if (isSmallDevice) {
		return <MobileLayout ref={_ref} {...other} />;
	} else {
		return <_Layout ref={_ref} {...other} />;
	}
};

export default Layout;
