import { styled } from "@mui/material";
import ScheduleDay from "../../components/ScheduleDay";

import styles from './ScheduleContainer.styles';

const ScheduleContainer = ({ scheduleData }) => {

	const Layout = styled('div')( styles.layout );
	const DaysContainer = styled('div')( styles.daysContainer );

	const days = scheduleData.map(day =>
		<ScheduleDay
			key={ day.date }
			dayData={ day }/>
	);

	return <Layout>
		<DaysContainer>
			{ days }
		</DaysContainer>
	</Layout>;
}

export default ScheduleContainer;