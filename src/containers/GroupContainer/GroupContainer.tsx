import {
	styled
} from '@mui/material';

import GroupGrid from '../../components/GroupGrid';
import Layout from '../Layout';

import styles from './GroupContainer.styles';

const GroupContainer = ({
	groupData
}) => {

	const StyledGroupGrid = styled(GroupGrid)( styles.groupGrid );

	return <Layout>
		<StyledGroupGrid data={ groupData }/>
	</Layout>
}

export default GroupContainer;