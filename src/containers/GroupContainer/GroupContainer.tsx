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
import { localStorageKeys } from '../../localStorageKeys';
import { getLocalStorage, setLocalStorage } from '../../utils';
import { WideLayout } from '../Layout';

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
			localStorageKeys.GroupContainer.TableSize,
			TableSize.medium,
		) as TableSize,
	);
	const isSmallSize = size === TableSize.small;

	const onClick = () => {
		const nextSize = isSmallSize ? TableSize.medium : TableSize.small;
		setSize(nextSize);
		setLocalStorage(localStorageKeys.GroupContainer.TableSize, nextSize);
	};

	useEffect(() => {
		const currentRecord: Array<string[]> =
			getRecord(localStorageKeys.GroupContainer.VisitedGroups) || [];
		const nextRecord = [];

		let already = false;
		for (let i = 0; i < currentRecord.length && nextRecord.length < 3; i++) {
			if (currentRecord[i][1] === router.asPath) {
				already = true;
			}
			nextRecord.push(currentRecord[i]);
		}

		if (!already) {
			nextRecord.unshift([
				`${groupData.discipline.name} - ${groupData.studentGroup.name}`,
				router.asPath,
			]);
			nextRecord.splice(3, 1);
		}

		setRecord(
			localStorageKeys.GroupContainer.VisitedGroups,
			nextRecord,
			true,
			'session',
		);
	}, []);

	useEffect(() => {
		/* После добавления функциональности о списке недавно посещенных групп возникла проблема:
		 * при переходе со спика одной группы на список другой данные не обновляются,
		 * т.к. скачивание данных расположенно в компоненте-странице
		 */
		const { groupid, disciplineid } = router.query;
		if (
			Number(groupid) !== groupData.studentGroup.id ||
			Number(disciplineid) !== groupData.discipline.id
		) {
			reload();
		}
	});

	return (
		<WideLayout>
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
		</WideLayout>
	);
};

export default GroupContainer;
