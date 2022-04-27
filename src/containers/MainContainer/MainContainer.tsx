import { styled } from '@mui/material/styles';
import {
	AppBar,
	List,
	ListItemButton,
	ListItemText,
	Typography
} from '@mui/material';

import styles from './MainContainer.styles';

const MainContainer = ({ children }) => {

	const Menu = styled(List)( styles.list );
	const Header = styled(AppBar)( styles.appBar );
	const GridContainer = styled('div')( styles.gridContainer );
	const ContentContainer = styled('div')( styles.contentContainer );

	return (
		<GridContainer>
			<Header position="relative">
				<Typography variant="h1">Электронный журнал</Typography>
			</Header>
			<Menu>
				<ListItemButton>
					<ListItemText>Расписание</ListItemText>
				</ListItemButton>
				<ListItemButton>
					<ListItemText>Список групп</ListItemText>
				</ListItemButton>
				<ListItemButton>
					<ListItemText>Мероприятия</ListItemText>
				</ListItemButton>
			</Menu>
		</GridContainer>
	);
}

export default MainContainer;