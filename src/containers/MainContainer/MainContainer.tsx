import { useRouter } from 'next/router';
import { NextLinkComposed } from '../../components/NextLinkCompose';
import {
	styled,
	AppBar,
	List,
	Link,
	ListItemButton,
	ListItemText,
	Typography,
	Stack
} from '@mui/material';

import UserInfo from '../../components/UserInfo';

import styles from './MainContainer.styles';


const GridContainer = styled('div')( styles.gridContainer );
const ContentContainer = styled('div')( styles.contentContainer );
const FooterContainer = styled('div')( styles.footerContainer )

const Menu = styled(Stack)( styles.menu );
const Header = styled(AppBar)( styles.appBar );
const Footer = styled(Stack)( styles.footer );

const MainContainer = ({ children }) => {

	const router = useRouter();

	const linksData = [
		{
			text: 'Расписание',
			href: '/schedule'
		},
		{
			text: 'Список групп',
			href: '/groups'
		},
		// {
		// 	text: 'Мероприятия',
		// 	href: '/events'
		// }
	];

	const links = linksData.map(linkData => {
		const isActive = router.asPath === linkData.href;

		return (
			<ListItemButton
				key={linkData.text}
				component={isActive ? 'a': NextLinkComposed}
				to={{
					pathname: linkData.href
				}}
				selected={isActive}
			>
				<ListItemText>{linkData.text}</ListItemText>
		</ListItemButton>
		)
	});


	return (
		<GridContainer>

			<Header position="relative">
				<Link
					component={NextLinkComposed}
					to={{
						pathname: '/'
					}}
					underline="none"
				>
					<Typography variant="h1">Электронный журнал</Typography>
				</Link>

				<UserInfo />
			</Header>

			<Menu
				justifyContent="space-between"
			>
				<List>
					{ links }
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
						<Typography variant="subtitle1">&copy; Alexander Malcev</Typography>
						<Typography variant="subtitle1">v0.9.1</Typography>
					</Footer>
				</FooterContainer>
			</Menu>
			
			<ContentContainer className="styled-scroll">
				{ children }
			</ContentContainer>
		</GridContainer>
	);
}

export default MainContainer;