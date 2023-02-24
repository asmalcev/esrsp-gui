import Head from 'next/head';

import MainContainer from '../../src/containers/MainContainer';
import { useAuth, UserRole } from '../../src/contexts/AuthContext';
import { useRouter } from 'next/router';
import { LinkData, adminLinksData as _adminLinksData } from '../../src/links';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { NextLinkComposed } from '../../src/components/NextLinkCompose';

const Admin = () => {
	const router = useRouter();
	const { user } = useAuth();

	if (user.role !== UserRole.ADMIN) {
		router.push('/403');
		return;
	}

	const adminLinksData: LinkData[] = [..._adminLinksData];

	const links = adminLinksData.map((linkData) => {
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
			<Head>
				<title>Управление данными - ESRSP</title>
			</Head>
			<MainContainer>
				<List>{links}</List>
			</MainContainer>
		</>
	);
};

export default Admin;
