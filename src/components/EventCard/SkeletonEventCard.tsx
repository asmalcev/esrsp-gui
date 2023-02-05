import React from "react";
import { Skeleton, useTheme } from "@mui/material";
import EventCard from "./EventCard";

const SkeletonEventCard = ({ customRef, ...rest }) => {
	const theme = useTheme();

	const data = {
		discipline: <Skeleton animation="wave" width={ theme.spacing(36) }/>,
		studentGroups: <Skeleton animation="wave" width={ theme.spacing(16) }/>,
		lessonTime: {
			timeStart: <Skeleton animation="wave" width={ theme.spacing(4) }/>,
			timeEnd: <Skeleton animation="wave" width={ theme.spacing(4) }/>,
		},
		place: <Skeleton animation="wave" width={ theme.spacing(6) }/>
	};

	return (
		<EventCard
			data={ data }
			customRef={ customRef }
			{...rest}/>
	);
}

export default SkeletonEventCard;