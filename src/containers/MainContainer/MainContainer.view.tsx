import {
	styled,
	List,
	Link,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import Footer from '../../common/Footer';
import { NextLinkComposed } from '../../components/NextLinkCompose';
import UserInfo from '../../components/UserInfo';
import { LinkData } from '../../links';
import { Header, Menu } from './common';

import styles from './MainContainer.styles';

const GridContainer = styled('div', { name: 'grid-container' })(
	styles.gridContainer,
);
const ContentContainer = styled('div', { name: 'content-container' })(
	styles.contentContainer,
);
const FooterContainer = styled('div', { name: 'footer-container' })(
	styles.footerContainer,
);

const MainContainerView = ({
	linksData,
	children,
}: {
	linksData: LinkData[];
	children: any;
}) => {
	const router = useRouter();

	const links = linksData.map((linkData) => {
		const isActive = router.asPath === linkData.href;

		return (
			<ListItemButton
				key={linkData.text}
				component={isActive ? 'a' : NextLinkComposed}
				to={{
					pathname: linkData.href,
				}}
				selected={isActive}
				sx={linkData.compact && { pl: 4 }}
			>
				<ListItemText
					primaryTypographyProps={linkData.compact && { fontSize: 14 }}
				>
					{linkData.text}
				</ListItemText>
			</ListItemButton>
		);
	});

	return (
		<GridContainer>
			<Header position="relative">
				<Link
					component={NextLinkComposed}
					to={{
						pathname: '/',
					}}
					underline="none"
				>
					<Typography variant="h1">Электронный журнал</Typography>
				</Link>

				<UserInfo />
			</Header>

			<Menu justifyContent="space-between">
				<List>{links}</List>

				<FooterContainer>
					{/* <List>
						<ListItemButton>
							<ListItemText>Настройки</ListItemText>
						</ListItemButton>
						<ListItemButton>
							<ListItemText>Справка</ListItemText>
						</ListItemButton>
					</List> */}
					<Footer />
				</FooterContainer>
			</Menu>

			<ContentContainer className="styled-scroll">{children}</ContentContainer>
		</GridContainer>
	);
};

export default MainContainerView;
