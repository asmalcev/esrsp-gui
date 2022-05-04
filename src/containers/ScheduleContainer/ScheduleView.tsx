import { styled } from "@mui/material";
import { useEffect, useRef } from "react";
import { SkeletonEventCard } from "../../components/EventCard";
import ScheduleDay from "../../components/ScheduleDay";

import styles from './ScheduleView.styles';

const ScheduleView = ({ scheduleData, currentIndex, handleLoader }) => {

	const upperLoader = useRef(null);
	const lowerLoader = useRef(null);
	const scrollChild = useRef(null);
	const currentDayElement = useRef(null);

	useEffect(() => {
		const scrollArea = scrollChild.current.parentNode;

		currentDayElement.current.scrollIntoView();

		const loaderObserver = new IntersectionObserver( ([entry]) => {
			if (entry.intersectionRatio > 0) {
				if (entry.target instanceof HTMLElement) {
					handleLoader(entry.target.dataset.loader);
				}
			}
		}, {
			root: scrollArea,
			threshold: 0
		});

		loaderObserver.observe(upperLoader.current);
		loaderObserver.observe(lowerLoader.current);

		return () => {
			loaderObserver.disconnect();
		};
	}, []);

	const Layout = styled('div')( styles.layout );
	const DaysContainer = styled('div')( styles.daysContainer );

	const days = scheduleData.map((day, index) =>
		<ScheduleDay
			key={ day.date.date }
			customRef={currentIndex === index ? currentDayElement : null}
			dayData={ day }/>
	);

	// useEffect(() => {
	// 	console.log('prop update', currentIndex);
	// }, [currentIndex]);

	return <Layout ref={scrollChild}>
		<DaysContainer>
			<SkeletonEventCard
				customRef={upperLoader}
				data-loader="upper"/>
			{ days }
			<SkeletonEventCard
				customRef={lowerLoader}
				data-loader="lower"/>
		</DaysContainer>
	</Layout>;
}

export default ScheduleView;