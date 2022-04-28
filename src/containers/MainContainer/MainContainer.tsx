import { NextLinkComposed } from '../../components/NextLinkCompose';
import { styled } from '@mui/material/styles';
import {
	AppBar,
	List,
	Link,
	ListItemButton,
	ListItemText,
	Typography,
	Stack
} from '@mui/material';

import styles from './MainContainer.styles';

const MainContainer = ({ children }) => {

	const GridContainer = styled('div')( styles.gridContainer );
	const ContentContainer = styled('div')( styles.contentContainer );
	const FooterContainer = styled('div')( styles.footerContainer )

	const Menu = styled(Stack)( styles.menu );
	const Header = styled(AppBar)( styles.appBar );
	const Footer = styled(Stack)( styles.footer );

	const LogoLink = styled(Link)( styles.logo );
	

	return (
		<GridContainer>

			<Header position="relative">
				<LogoLink
					component={NextLinkComposed}
					to={{
						pathname: '/'
					}}
					underline="none"
				>
					<Typography variant="h1">Электронный журнал</Typography>
				</LogoLink>
			</Header>

			<Menu
				justifyContent="space-between"
			>
				<List>
					<ListItemButton
						component={NextLinkComposed}
						to={{
							pathname: '/schedule'
						}}
					>
						<ListItemText>Расписание</ListItemText>
					</ListItemButton>
					<ListItemButton>
						<ListItemText>Список групп</ListItemText>
					</ListItemButton>
					<ListItemButton>
						<ListItemText>Мероприятия</ListItemText>
					</ListItemButton>
				</List>

				<FooterContainer>
					<List>
						<ListItemButton>
							<ListItemText>Настройки</ListItemText>
						</ListItemButton>
						<ListItemButton>
							<ListItemText>Справка</ListItemText>
						</ListItemButton>
					</List>
					<Footer
						direction="row"
						justifyContent="space-between"
					>
						<Typography variant="subtitle2">&copy; Alexander Malcev</Typography>
						<Typography variant="subtitle2">v0.1.0</Typography>
					</Footer>
				</FooterContainer>
			</Menu>
			
			<ContentContainer>
				{ children }
			</ContentContainer>
		</GridContainer>
	);
}

export default MainContainer;