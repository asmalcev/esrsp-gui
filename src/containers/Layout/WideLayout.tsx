import { styled } from '@mui/material';
import { useDevice } from '../../contexts/DeviceContext';

import Layout from './Layout';

const _WideLayout = styled(Layout, { name: 'wide-layout' })(({ theme }) => ({
	padding: theme.spacing(2),

	'&': {
		flexDirection: 'column',
		gap: theme.spacing(2),
	},
}));

const MobileWideLayout = styled(Layout, { name: 'mobile-wide-layout' })(
	({ theme }) => ({
		'&': {
			flexDirection: 'column',
			gap: theme.spacing(2),
		},
	}),
);

const WideLayout = (props) => {
	const { _ref, ...other } = props;
	const { isSmallDevice } = useDevice();

	if (isSmallDevice) {
		return <MobileWideLayout ref={_ref} {...other} />;
	} else {
		return <_WideLayout ref={_ref} {...other} />;
	}
};

export default WideLayout;
