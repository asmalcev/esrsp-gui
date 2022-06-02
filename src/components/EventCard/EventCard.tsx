import {
	styled,
	Typography,
	Paper,
	Stack,
	Icon
} from "@mui/material";

import styles from './EventCard.styles';

const Container = styled(Paper)( styles.container );
const Content = styled('div')( styles.content );
const ArrowDownward = styled(Icon)( styles.arrow );

const EventCard = ({ data, customRef, ...rest }) => {
	return (
		<Container ref={ customRef } {...rest}>
			<Stack
				alignItems="center"
			>
				<Typography variant="subtitle1">{ data.timeStart }</Typography>
				<ArrowDownward>arrow_downward</ArrowDownward>
				<Typography variant="subtitle1">{ data.timeEnd }</Typography>
			</Stack>

			<Content>
				<Typography>{ data.name }</Typography>
				<Typography variant="subtitle1">{ data.members }</Typography>
				<Typography variant="subtitle1">{ data.place }</Typography>
			</Content>
		</Container>
	);
}

export default EventCard;