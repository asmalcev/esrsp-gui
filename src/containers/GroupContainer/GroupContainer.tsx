import {
	styled,
	Typography
} from '@mui/material';

import GroupGrid from '../../components/GroupGrid';
import Layout from '../Layout';

import styles from './GroupContainer.styles';

const StyledLayout = styled(Layout)( styles.layout );

const GroupContainer = ({
	groupData
}) => {
	return <StyledLayout>
		<Typography variant="h2">{ groupData.discipline }</Typography>
		<GroupGrid data={ groupData }/>
	</StyledLayout>
}

export default GroupContainer;