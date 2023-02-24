import { useAuth, UserRole } from '../../contexts/AuthContext';
import { useRecord } from '../../contexts/RecordContext';
import { localStorageKeys } from '../../localStorageKeys';
import {
	LinkData,
	userLinksData as _userLinksData,
	teacherLinksData as _teacherLinksData,
	studentLinksData as _studentLinksData,
	adminLinksData as _adminLinksData,
} from '../../links';
import { useDevice } from '../../contexts/DeviceContext';
import MainContainerView from './MainContainer.view';
import MainContainerMobile from './MainContainer.mobile';

const MainContainer = ({ children }) => {
	const { user } = useAuth();
	const { getRecord } = useRecord();
	const { isSmallDevice } = useDevice();

	const linksData: LinkData[] = [];

	const userLinksData: LinkData[] = [..._userLinksData];

	const teacherLinksData: LinkData[] = [..._teacherLinksData];

	const visitedGroups = getRecord(
		localStorageKeys.GroupContainer.VisitedGroups,
	);
	if (visitedGroups) {
		for (const group of visitedGroups) {
			teacherLinksData.push({
				text: group[0],
				href: group[1],
				compact: true,
			});
		}
	}

	const studentLinksData: LinkData[] = [..._studentLinksData];

	const adminLinksData: LinkData[] = [..._adminLinksData];

	if (user.role === UserRole.ADMIN) {
		linksData.push(...adminLinksData);
	} else if (user.role === UserRole.STUDENT) {
		linksData.push(...userLinksData);
		linksData.push(...studentLinksData);
	} else if (user.role === UserRole.TEACHER) {
		linksData.push(...userLinksData);
		linksData.push(...teacherLinksData);
	}

	return isSmallDevice ? (
		<MainContainerMobile linksData={linksData}>{children}</MainContainerMobile>
	) : (
		<MainContainerView linksData={linksData}>{children}</MainContainerView>
	);
};

export default MainContainer;
