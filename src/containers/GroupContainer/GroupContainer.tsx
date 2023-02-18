import {
	styled,
	Typography,
	Stack,
	Checkbox,
	FormControlLabel,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { StudentGroupPerformance } from '../../backend.types';

import GroupGrid from '../../components/GroupGrid';
import { TableSize } from '../../components/GroupGrid/GroupGrid.types';
import { useRecord } from '../../contexts/RecordContext';
import { useReload } from '../../contexts/ReloadContext';
import { dotLSK } from '../../localStorageKeys';
import { getLocalStorage, setLocalStorage } from '../../utils';
import Layout from '../Layout';

import styles from './GroupContainer.styles';
import recordKey from './recordKey';

const StyledLayout = styled(Layout)(styles.layout);

const GroupContainer = ({
	groupData,
}: {
	groupData: StudentGroupPerformance;
}) => {
	const { reload } = useReload();

	const { setRecord, getRecord } = useRecord();
	const router = useRouter();

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

	useEffect(() => {
		const currentRecord: Array<string[]> = getRecord(recordKey) || [];
		const nextRecord = [];

		let already = false;
		for (let i = 0; i < currentRecord.length && nextRecord.length < 3; i++) {
			if (currentRecord[i][1] === router.asPath) {
				already = true;
			}
			nextRecord.push(currentRecord[i]);
		}

		if (!already) {
			nextRecord.unshift([groupData.studentGroup.name, router.asPath]);
			nextRecord.splice(3, 1);
		}

		setRecord(recordKey, nextRecord);
	}, []);

	useEffect(() => {
		/* После добавления функциональности о списке недавно посещенных групп возникла проблема:
		 * при переходе со спика одной группы на список другой данные не обновляются,
		 * т.к. скачивание данных расположенно в компоненте-странице
		 */
		const { groupid, disciplineid } = router.query;
		if (Number(groupid) !== groupData.studentGroup.id || Number(disciplineid) !== groupData.discipline.id) {
			reload();
		}
	});

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
