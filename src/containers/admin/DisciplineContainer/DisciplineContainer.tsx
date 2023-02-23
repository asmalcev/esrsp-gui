import { Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Discipline } from '../../../backend.types';
import Button from '../../../common/Button';
import InputBox from '../../../common/InputBox';
import TextField from '../../../common/TextField';
import { WideLayout } from '../../Layout';

const DisciplineContainer = ({ data }: { data: Discipline }) => {
	const [name, setName] = useState<string>(data.name);
	const { enqueueSnackbar } = useSnackbar();

	const onSave = async (e) => {
		e.preventDefault();

		if (name.length === 0) {
			enqueueSnackbar(`Error: discipline name cannot be empty`, {
				variant: 'error',
			});
			return;
		}

		const body: Discipline = {
			id: data.id,
			name,
		};

		const res = await fetch(`/api/schedule/discipline/${data.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		if (res.status === 200) {
			enqueueSnackbar(`Success: saved`, { variant: 'success' });
		} else {
			enqueueSnackbar(`Error ${res.status}`, { variant: 'error' });
		}
	};

	return (
		<WideLayout>
			<Typography variant="h2">Управление дисциплинами</Typography>
			<form onSubmit={onSave}>
				<InputBox sx={{ width: 'auto' }}>
					<TextField label="id" value={data.id} disabled />
				</InputBox>
				<InputBox sx={{ width: 'auto' }}>
					<TextField label="name" value={name} onChange={setName} />
				</InputBox>
				<InputBox sx={{ width: 'auto' }}>
					<Button onClick={onSave} type="submit">
						Сохранить
					</Button>
				</InputBox>
			</form>
		</WideLayout>
	);
};

export default DisciplineContainer;
