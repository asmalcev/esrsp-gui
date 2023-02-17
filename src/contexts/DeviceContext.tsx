import { createContext, useContext, useEffect, useState } from 'react';

export type DeviceInfo = {
	currentWidth: number;
	isXSmallDevice: boolean;
	isSmallDevice: boolean;
	isMediumDevice: boolean;
	isLargeDevice: boolean;
	isXLargeDevice: boolean;
	isTouches: boolean;
	isMouse: boolean;
	isLandscapeOrientation: boolean;
};

const defaultValues = {
	device: {
		currentWidth: -1,
		isXSmallDevice: false,
		isSmallDevice: false,
		isMediumDevice: false,
		isLargeDevice: false,
		isXLargeDevice: false,
		isTouches: false,
		isMouse: false,
		isLandscapeOrientation: false,
	},
};

export const DeviceContext = createContext<DeviceInfo>({
	...defaultValues.device,
});

export const DeviceContextProdiver = (props) => {
	const { children, ...other } = props;

	const [device, setDevice] = useState<DeviceInfo>(defaultValues.device);

	const updateDevice = () => {
		if (window.innerWidth === device.currentWidth) {
			return;
		}

		setDevice({
			currentWidth: window.innerWidth,
			isXSmallDevice: window.innerWidth <= 480,
			isSmallDevice: window.innerWidth <= 968,
			isMediumDevice: window.innerWidth <= 1400,
			isLargeDevice: window.innerWidth <= 1920,
			isXLargeDevice: window.innerWidth > 1920,
			isTouches: 'ontouchstart' in document.documentElement,
			isMouse: matchMedia('(pointer: fine)').matches,
			isLandscapeOrientation:
				document.documentElement.clientWidth > 968 ||
				matchMedia('(orientation: landscape)').matches,
		});
	};

	useEffect(() => {
		window.addEventListener('resize', updateDevice);

		updateDevice();

		return () => {
			window.removeEventListener('resize', updateDevice);
		};
	}, []);

	return (
		<DeviceContext.Provider value={device} {...other}>
			{children}
		</DeviceContext.Provider>
	);
};

export const useDevice = () => useContext(DeviceContext);
