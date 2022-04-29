import {
	styled,
	Typography,
	Paper,
	Stack,
	Icon
} from "@mui/material";

import styles from './EventCard.styles';

const EventCard = ({}) => {

	const Container = styled(Paper)( styles.container );
	const Content = styled('div')( styles.content );

	const ArrowDownward = styled(Icon)( styles.arrow );
	
	return (
		<Container>
			<Stack
				alignItems="center"
			>
				<Typography variant="subtitle1">10:50</Typography>
				<ArrowDownward>arrow_downward</ArrowDownward>
				<Typography variant="subtitle1">12:20</Typography>
			</Stack>

			<Content>
				<Typography>Разработка пользовательских интерфейсов</Typography>
				<Typography variant="subtitle1">И595</Typography>
				<Typography variant="subtitle1">218* - Практика</Typography>
			</Content>
		</Container>
	);
}

export default EventCard;