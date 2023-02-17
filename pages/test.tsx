import { useDevice } from '../src/contexts/DeviceContext';

const Test = () => {
	const device = useDevice();

	return (
		<>
			<h1>Hello world</h1>
			<p>{device.isSmallDevice ? 'modile' : 'desktop'}</p>
		</>
	);
};

export default Test;
