import { styled, Typography, Paper, Stack, Icon } from '@mui/material';

import styles from './EventCard.styles';
import { TimedLesson } from '../../backend.types';
import { useAuth, UserRole } from '../../contexts/AuthContext';

const Container = styled(Paper)(styles.container);
const Content = styled('div')(styles.content);
const ArrowDownward = styled(Icon)(styles.arrow);

const EventCard = ({
	data,
	customRef,
	...rest
}: {
	data: TimedLesson;
	customRef;
} & any) => {
	const { user } = useAuth();

	return (
		<Container ref={customRef} {...rest}>
			<Stack alignItems="center">
				<Typography variant="subtitle1">{data.lessonTime.timeStart}</Typography>
				<ArrowDownward>arrow_downward</ArrowDownward>
				<Typography variant="subtitle1">{data.lessonTime.timeEnd}</Typography>
			</Stack>

			<Content>
				<Typography>{data.discipline}</Typography>
				<Typography variant="subtitle1">
					{user.role === UserRole.STUDENT
						? data.teacher.fullname
						: data.studentGroups}
				</Typography>
				<Typography variant="subtitle1">{data.place}</Typography>
			</Content>
		</Container>
	);
};

export default EventCard;
