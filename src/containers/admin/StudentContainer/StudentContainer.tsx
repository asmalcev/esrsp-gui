import { Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Student } from '../../../backend.types';
import Button from '../../../common/Button';
import InputBox from '../../../common/InputBox';
import TextField from '../../../common/TextField';
import { WideLayout } from '../../Layout';

const StudentContainer = ({ data }: { data: Student }) => {
	const [fullname, setFullname] = useState<string>(data.fullname);
	const [recordBook, setRecordBook] = useState<string>(data.recordBook);
	const { enqueueSnackbar } = useSnackbar();

	const onSave = async e => {
		e.preventDefault();

		if (fullname.length === 0) {
			enqueueSnackbar(`Error: discipline name cannot be empty`, { variant: 'error' });
			return;
		}

		const body: Student = {
			id: data.id,
			fullname,
			recordBook,
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
					<TextField label="name" value={fullname} onChange={setFullname} />
				</InputBox>
				<InputBox sx={{ width: 'auto' }}>
					<TextField label="name" value={recordBook} onChange={setRecordBook} />
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

export default StudentContainer;
