import { useEffect, useRef, useState } from "react";

import { styled } from "@mui/material";

import { SkeletonEventCard } from "../../components/EventCard";
import ScheduleDay from "../../components/ScheduleDay";
import DatePicker from "../../components/DatePicker";
import Layout from "../Layout";

import { throttle } from "../../utils";

import styles from './ScheduleView.styles';

const ScheduleView = ({ scheduleData, currentIndex, handleLoader }) => {

	/**
	 * useRef for HTML Elements
	 */
	const upperLoader = useRef(null);
	const lowerLoader = useRef(null);
	const scrollChild = useRef(null);
	const scrollTarget = useRef(null);


	/**
	 * useRef for storing Intersection Observer
	 */
	const loaderObserver = useRef(null);


	/**
	 * define scroll target type:
	 * null |
	 * 'today' |
	 * 'choosedDate' |
	 * 'secondOddMonday' - need after uploading data from above
	 */
	const [ scrollTargetType, setScrollTargetType ] = useState<null | string>('today');


	/**
	 * styled components
	 */
	const DaysContainer = styled('div')( styles.daysContainer );
	const DatePickerContainer = styled('div')( styles.datePickerContainer );


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
			 * upload data when loader in viewport
			 */
			if (entry.intersectionRatio > 0) {
				if (entry.target instanceof HTMLElement) { // need to get access to dataset
					const loaderType = entry.target.dataset.loader;
					handleLoader(loaderType);

					if (loaderType === 'upper') {
						setScrollTargetType('secondOddMonday');
					} else {
						setScrollTargetType(null);
					}
				}
			}
		}, {
			root: scrollArea,
			threshold: 0
		});

		loaderObserver.current.observe(upperLoader.current);
		loaderObserver.current.observe(lowerLoader.current);

		scrollTarget.current?.scrollIntoView();

		return () => {
			loaderObserver.current.disconnect();
		};
	});


	const days = scheduleData.map((day, index) =>
		<ScheduleDay
			key={ day.date.jsdate }
			dayData={ day }
			customRef={
				scrollTargetType === 'today' ?
					(currentIndex === index ? scrollTarget : null) :
					scrollTargetType === 'secondOddMonday' ?
						(index === 14 ? scrollTarget : null) :
						null
			}/>
	);

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

		<DatePickerContainer data-scroll-follow>
			<DatePicker
				label="Перейти к дате"
				helperText="Выберете дату, чтобы перейти к ней в расписании"/>
		</DatePickerContainer>
	</Layout>;
}

export default ScheduleView;