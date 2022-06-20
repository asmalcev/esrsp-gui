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
	Stack,
} from '@mui/material';

import UserInfo from '../../components/UserInfo';

import styles from './MainContainer.styles';
import { useAuth } from '../../contexts/AuthContext';


const GridContainer = styled('div')( styles.gridContainer );
const ContentContainer = styled('div')( styles.contentContainer );
const FooterContainer = styled('div')( styles.footerContainer )

const Menu = styled(Stack)( styles.menu );
const Header = styled(AppBar)( styles.appBar );
const Footer = styled(Stack)( styles.footer );
const AdminBlock = styled('div')( styles.adminBlock );

const MainContainer = ({ children }) => {

	const router = useRouter();
	const { user } = useAuth();

	const linksData = [
		{
			text: 'Расписание',
			href: '/schedule'
		},
		{
			text: 'Список групп',
			href: '/groups'
		},
	];

	const adminLinksData = [
		{
			text: 'Управление данными',
			href: '/admin'
		}
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

	const adminLinks = [
		<AdminBlock key="admin-block">
			<Typography>Администрирование</Typography>
		</AdminBlock>
	].concat(
		adminLinksData.map(linkData => {
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
		})
	);

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
					{
						links
					}
					{
						user.usertype === 'admin' && adminLinks
					}
				</List>

				<FooterContainer>
					{/* <List>
						<ListItemButton>
							<ListItemText>Настройки</ListItemText>
						</ListItemButton>
						<ListItemButton>
							<ListItemText>Справка</ListItemText>
						</ListItemButton>
					</List> */}
					<Footer
						direction="row"
						justifyContent="space-between"
					>
						<Typography variant="subtitle1">&copy; Alexander Malcev</Typography>
						<Typography variant="subtitle1">v0.9.2</Typography>
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