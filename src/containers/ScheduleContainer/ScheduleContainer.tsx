import { styled } from "@mui/material";
import ScheduleDay from "../../components/ScheduleDay";

import styles from './ScheduleContainer.styles';

const ScheduleContainer = ({  }) => {
	const Layout = styled('div')( styles.layout )

	return <Layout>
		<ScheduleDay />
	</Layout>;
}

export default ScheduleContainer;