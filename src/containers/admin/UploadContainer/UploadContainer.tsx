import { Alert, AlertTitle, Input, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import Button from '../../../common/Button';
import InputBox from '../../../common/InputBox';
import { downloadObjectAsJson } from '../../../utils';
import { WideLayout } from '../../Layout';

enum UploadSteps {
	'none',
	'lessonTimes',
	'timetable',
	'groups',
	'users',
}

const uploadSteps = {
	lessonTimes: '/api/upload/timetable/lessons-times',
	timetable: '/api/upload/timetable/json',
	groups: '/api/upload/groups/json',
};

const UploadContainer = () => {
	const { enqueueSnackbar } = useSnackbar();

	// const [step, setStep] = useState<UploadSteps>(UploadSteps.none);

	const onSave = async (key: string, e) => {
		e.preventDefault();

		const res = await fetch(uploadSteps[key], {
			method: 'POST',
			body: new FormData(e.target),
		});

		if (res.status === 201) {
			enqueueSnackbar(`Success: saved`, { variant: 'success' });
			// setStep(step + 1);
		} else {
			enqueueSnackbar(`Error ${res.status}`, { variant: 'error' });
		}
	};

	const onGenerateUsers = async (e) => {
		e.preventDefault();

		const res = await fetch('/api/generate/users');

		if (res.status === 200) {
			enqueueSnackbar(`Success: users generated`, { variant: 'success' });

			const json = await res.json();

			downloadObjectAsJson(json, 'users');
		} else {
			enqueueSnackbar(`Error ${res.status}`, { variant: 'error' });
		}
	};

	return (
		<WideLayout>
			<Alert severity="warning">
				<AlertTitle>Внимание!</AlertTitle>
				<p>При загрузке новых данных, старые будут безвозвратно утеряны.</p>
				<p>
					Правильный порядок загрузки данных: расписание, список групп,
					промежутки уроков.
				</p>
				<p>
					При загрузке хоть одного из типов данных, необходимо также загрузить
					остальные в правильном порядке.
				</p>
				<p>
					После выполнения всех загрузок необходимо сгенерировать аккаунты
					пользователей, иначе будет существовать только аккаунт администратора.
				</p>
			</Alert>
			<form onSubmit={onSave.bind(null, 'timetable')}>
				<Typography variant="h2">Загрузить расписание</Typography>
				<InputBox>
					<Input type="file" name="file" />
				</InputBox>
				<InputBox>
					<Button type="submit">Загрузить</Button>
				</InputBox>
			</form>
			<form onSubmit={onSave.bind(null, 'groups')}>
				<Typography variant="h2">Загрузить список групп</Typography>
				<InputBox>
					<Input type="file" name="file" />
				</InputBox>
				<InputBox>
					<Button type="submit">Загрузить</Button>
				</InputBox>
			</form>
			<form onSubmit={onSave.bind(null, 'lessonTimes')}>
				<Typography variant="h2">Загрузить промежутки уроков</Typography>
				<InputBox>
					<Input type="file" name="file" />
				</InputBox>
				<InputBox>
					<Button type="submit">Загрузить</Button>
				</InputBox>
			</form>
			<form onSubmit={onGenerateUsers}>
				<Typography variant="h2">
					Сгенерировать аккаунты пользователей
				</Typography>
				<InputBox>
					<Button type="submit">Сгенерировать</Button>
				</InputBox>
			</form>
		</WideLayout>
	);
};

export default UploadContainer;
