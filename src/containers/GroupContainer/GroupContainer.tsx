import {
	styled,
	Typography,
	Stack,
	Checkbox,
	FormControlLabel,
} from '@mui/material';
import { useState } from 'react';
import { StudentGroupPerformance } from '../../backend.types';

import GroupGrid from '../../components/GroupGrid';
import { TableSize } from '../../components/GroupGrid/GroupGrid.types';
import { dotLSK } from '../../localStorageKeys';
import { getLocalStorage, setLocalStorage } from '../../utils';
import Layout from '../Layout';

import styles from './GroupContainer.styles';

const StyledLayout = styled(Layout)(styles.layout);

const GroupContainer = ({
	groupData,
}: {
	groupData: StudentGroupPerformance;
}) => {
	const [size, setSize] = useState(
		getLocalStorage(
			dotLSK('GroupContainer.TableSize'),
			TableSize.medium,
		) as TableSize,
	);
	const isSmallSize = size === TableSize.small;

	const onClick = () => {
		const nextSize = isSmallSize ? TableSize.medium : TableSize.small;
		setSize(nextSize);
		setLocalStorage(dotLSK('GroupContainer.TableSize'), nextSize);
	};

	return (
		<StyledLayout>
			<Stack flexDirection="row" justifyContent="space-between">
				<Typography variant="h2">{groupData.discipline.name}</Typography>
				<FormControlLabel
					control={
						<Checkbox
							onClick={onClick}
							checked={isSmallSize}
							color="secondary"
							sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
						/>
					}
					label={
						<Typography variant="subtitle1" sx={{ userSelect: 'none' }}>
							Компактная
						</Typography>
					}
					labelPlacement="start"
				/>
			</Stack>
			<GroupGrid data={groupData} size={size} />
		</StyledLayout>
	);
};

export default GroupContainer;
