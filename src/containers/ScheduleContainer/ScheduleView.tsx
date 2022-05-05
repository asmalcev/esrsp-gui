import { useEffect, useRef } from "react";

import { styled } from "@mui/material";

import { SkeletonEventCard } from "../../components/EventCard";
import ScheduleDay from "../../components/ScheduleDay";
import DatePicker from "../../components/DatePicker";

import { throttle } from "../../utils";

import styles from './ScheduleView.styles';

const ScheduleView = ({ scheduleData, currentIndex, handleLoader }) => {

	/**
	 * useRef for HTML Elements
	 */
	// const upperLoader = useRef(null);
	const lowerLoader = useRef(null);
	const scrollChild = useRef(null);
	const scrollTarget = useRef(null);


	/**
	 * useRef for storing Intersection Observer
	 */
	const loaderObserver = useRef(null);

	/**
	 * styled components
	 */
	const Layout = styled('div')( styles.layout );
	const DaysContainer = styled('div')( styles.daysContainer );
	const DatePickerContainer = styled('div')( styles.datePickerContainer );


	const days = scheduleData.map((day, index) =>
		<ScheduleDay
			key={ day.date.date }
			customRef={currentIndex === index ? scrollTarget : null}
			dayData={ day }/>
	);


	/**
	 * onMount
	 * scroll to target element (often for today card)
	 */
	useEffect(() => {
		const scrollArea = scrollChild.current.parentNode;

		const handleScroll = throttle(e => {
			e.target.querySelectorAll('*[data-scroll-follow]').forEach(sf => {
				sf.style.marginTop = `${e.target.scrollTop}px`;
			});
		}, 5);
		scrollArea.addEventListener('scroll', handleScroll);

		scrollTarget.current.scrollIntoView();
	}, []);


	/**
	 * onRerender
	 * necessary to recreate Intersection Observer cause upperLoader and lowerLoader are recreating in DOM and refs drop
	 * and handlerLoader updates with every rerender
	 */
	useEffect(() => {
		const scrollArea = scrollChild.current.parentNode;

		loaderObserver.current = new IntersectionObserver( ([entry]) => {
			/**
			 * update data when loader in viewport
			 */
			if (entry.intersectionRatio > 0) {
				if (entry.target instanceof HTMLElement) { // need to get access to dataset
					handleLoader(entry.target.dataset.loader);
				}
			}
		}, {
			root: scrollArea,
			threshold: 0
		});

		// loaderObserver.current.observe(upperLoader.current);
		loaderObserver.current.observe(lowerLoader.current);

		return () => {
			loaderObserver.current.disconnect();
		};
	});


	return <Layout ref={scrollChild}>

		<DaysContainer>
			{/* <SkeletonEventCard
				customRef={upperLoader}
				data-loader="upper"/> */}
			{ days }
			<SkeletonEventCard
				customRef={lowerLoader}
				data-loader="lower"/>
		</DaysContainer>

		<DatePickerContainer data-scroll-follow>
			<DatePicker
				label="Перейти к дате"/>
		</DatePickerContainer>
	</Layout>;
}

export default ScheduleView;