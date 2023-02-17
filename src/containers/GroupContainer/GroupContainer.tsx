import {
	styled,
	Typography
} from '@mui/material';
import { StudentGroupPerformance } from '../../backend.types';

import GroupGrid from '../../components/GroupGrid';
import Layout from '../Layout';

import styles from './GroupContainer.styles';

const StyledLayout = styled(Layout)( styles.layout );

const GroupContainer = ({
	groupData
}: {
	groupData: StudentGroupPerformance;
}) => {
	return <StyledLayout>
		<Typography variant="h2">{ groupData.discipline.name } - Группа { groupData.studentGroup.name }</Typography>
		<GroupGrid data={ groupData }/>
	</StyledLayout>
}

export default GroupContainer;