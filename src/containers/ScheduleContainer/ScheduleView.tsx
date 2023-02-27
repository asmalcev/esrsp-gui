import { useEffect, useRef, useState } from 'react';

import { styled } from '@mui/material';

import { SkeletonEventCard } from '../../components/EventCard';
import ScheduleDay from '../../components/ScheduleDay';
import DatePicker from '../../components/DatePicker';
import Layout from '../Layout';

import styles from './ScheduleView.styles';
import { ScheduleData } from './scheduleData.type';
import { compareDates } from '../../utils';
import { usePlaces } from '../../contexts/PlaceContext';
import { useDevice } from '../../contexts/DeviceContext';

const DaysContainer = styled('div', { name: 'days-container' })(
	styles.daysContainer,
);
const DatePickerContainer = styled('div', { name: 'date-picker-container' })(
	styles.datePickerContainer,
);

const ScheduleView = ({
	scheduleData,
	currentIndex,
	handleLoader,
	updateCurrentDate,
	currentDate,
}: {
	scheduleData: ScheduleData[];
	currentIndex: number;
	handleLoader: Function;
	updateCurrentDate: Function;
	currentDate: Date;
}) => {
	const { isSmallDevice } = useDevice();
	const { setPlace } = usePlaces();

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
	 * 'secondOddMonday' - need after uploading data from above
	 */
	const [scrollTargetType, setScrollTargetType] = useState<null | string>(
		'today',
	);

	/**
	 * date picker change handler
	 */
	const onDateChange = (value) => {
		updateCurrentDate(value?.$d);
		setScrollTargetType('today');
	};

	/**
	 * onRerender
	 * necessary to recreate Intersection Observer cause upperLoader and lowerLoader are recreating in DOM and refs drop
	 * and handlerLoader updates with every rerender
	 */
	useEffect(() => {
		const scrollArea = scrollChild.current.parentNode;

		loaderObserver.current = new IntersectionObserver(
			([entry]) => {
				/**
				 * upload data when loader in viewport
				 */
				if (entry.intersectionRatio > 0) {
					if (entry.target instanceof HTMLElement) {
						// need to get access to dataset
						const loaderType = entry.target.dataset.loader;
						handleLoader(loaderType);

						if (loaderType === 'upper') {
							setScrollTargetType('secondOddMonday');
						} else {
							setScrollTargetType(null);
						}
					}
				}
			},
			{
				root: scrollArea,
				threshold: 0,
			},
		);

		loaderObserver.current.observe(upperLoader.current);
		loaderObserver.current.observe(lowerLoader.current);

		scrollTarget.current?.scrollIntoView();

		return () => {
			loaderObserver.current.disconnect();
		};
	});

	// useEffect(() => {
	// 	setPlace(
	// 		'header',
	// 		<DatePicker
	// 			label="Перейти к дате"
	// 			onChangeHandler={onDateChange}
	// 			stdValue={currentDate}
	// 		/>,
	// 	);

	// 	return () => {
	// 		setPlace('header', null);
	// 	};
	// }, []);

	const days = scheduleData.map((day, index) => (
		<ScheduleDay
			key={day.date.jsdate.getTime()}
			dayData={day}
			active={compareDates(new Date(), day.date.jsdate)}
			customRef={
				scrollTargetType === 'today'
					? currentIndex === index
						? scrollTarget
						: null
					: scrollTargetType === 'secondOddMonday'
					? index === 14
						? scrollTarget
						: null
					: null
			}
		/>
	));

	return (
		<Layout _ref={scrollChild}>
			<DaysContainer>
				<SkeletonEventCard customRef={upperLoader} data-loader="upper" />
				{days}
				<SkeletonEventCard customRef={lowerLoader} data-loader="lower" />
			</DaysContainer>

			{!isSmallDevice && (
				<DatePickerContainer>
					<DatePicker
						label="Перейти к дате"
						helperText="Выберете дату, чтобы перейти к ней в расписании"
						onChangeHandler={onDateChange}
						stdValue={currentDate}
					/>
				</DatePickerContainer>
			)}
		</Layout>
	);
};

export default ScheduleView;
