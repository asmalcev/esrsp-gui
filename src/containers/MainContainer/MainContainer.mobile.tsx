import {
	Drawer,
	Icon,
	ListItemButton,
	ListItemText,
	IconButton,
	List,
	Stack,
	styled,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Footer from '../../common/Footer';
import { NextLinkComposed } from '../../components/NextLinkCompose';
import UserInfo from '../../components/UserInfo';
import { LinkData } from '../../links';
import { Header } from './common';

import styles from './MainContainer.styles';

const ContentContainer = styled('div')(styles.mobileContentContainer);
const RelativeHeader = styled(Header)(styles.relativeHeader);

const MainContainerMobile = ({
	linksData,
	children,
}: {
	linksData: LinkData[];
	children: any;
}) => {
	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const onMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

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
		<>
			<Drawer open={isMenuOpen} onClose={onMenuToggle}>
				<RelativeHeader>
					<IconButton onClick={onMenuToggle}>
						<Icon color="secondary">menu</Icon>
					</IconButton>
				</RelativeHeader>
				<Stack
					flexDirection="column"
					justifyContent="space-between"
					sx={{ height: '100%' }}
				>
					<List onClick={onMenuToggle}>{links}</List>
					<UserInfo />
				</Stack>
				<Footer />
			</Drawer>
			<Header>
				<IconButton onClick={onMenuToggle}>
					<Icon color="secondary">menu</Icon>
				</IconButton>
			</Header>
			<ContentContainer className="styled-scroll">{children}</ContentContainer>
		</>
	);
};

export default MainContainerMobile;
