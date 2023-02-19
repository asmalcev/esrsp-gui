import { Discipline } from '../../backend.types';
import PerformanceGrid from '../../components/PerformanceGrid';
import { WideLayout } from '../Layout';

const PerformanceContainer = ({
	performanceData,
}: {
	performanceData: Discipline[];
}) => {
	const performances = performanceData.map((performance) => (
		<PerformanceGrid data={performance} key={performance.id} />
	));

	return <WideLayout>{performances}</WideLayout>;
};

export default PerformanceContainer;
