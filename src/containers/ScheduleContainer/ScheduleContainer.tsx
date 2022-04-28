import { styled } from "@mui/material";
import ScheduleDay from "../../components/ScheduleDay";

import styles from './ScheduleContainer.styles';

const ScheduleContainer = ({  }) => {

	const Layout = styled('div')( styles.layout );
	const DaysContainer = styled('div')( styles.daysContainer );

	return <Layout>
		<DaysContainer>
			<ScheduleDay />
		</DaysContainer>
	</Layout>;
}

export default ScheduleContainer;