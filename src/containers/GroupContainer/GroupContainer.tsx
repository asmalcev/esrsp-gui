import {
	styled
} from '@mui/material';

import GroupGrid from '../../components/GroupGrid';
import Layout from '../Layout';

import styles from './GroupContainer.styles';

const GroupContainer = ({
	groupData
}) => {

	const StyledLayout = styled(Layout)( styles.layout );

	return <StyledLayout>
		<GroupGrid data={ groupData }/>
	</StyledLayout>
}

export default GroupContainer;