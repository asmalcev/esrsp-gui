import {
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { Discipline } from '../../../backend.types';
import Button from '../../../common/Button';
import TextField from '../../../common/TextField';
import { WideLayout } from '../../Layout';

const DisciplineContainer = ({ data }: { data: Discipline }) => {
	const [name, setName] = useState<string>(data.name);

	const onSave = () => {
		console.log('onSave', name);
	}

	return (
		<WideLayout>
			<Typography variant="h2">Управление дисциплинами</Typography>
			<TextField
				label="id"
				value={data.id}
				disabled/>
			<TextField
				label="name"
				value={name}
				onChange={setName}/>
			<Button onClick={onSave}>Сохранить</Button>
		</WideLayout>
	);
};

export default DisciplineContainer;