import { Skeleton, useTheme } from "@mui/material";
import EventCard from "./EventCard";

const SkeletonEventCard = ({}) => {
	const theme = useTheme();

	const data = {
		name: <Skeleton animation="wave" width={ theme.spacing(36) }/>,
		members: <Skeleton animation="wave" width={ theme.spacing(16) }/>,
		timeStart: <Skeleton animation="wave" width={ theme.spacing(4) }/>,
		timeEnd: <Skeleton animation="wave" width={ theme.spacing(4) }/>,
		place: <Skeleton animation="wave" width={ theme.spacing(6) }/>
	};

	return <EventCard data={ data }/>
}

export default SkeletonEventCard;