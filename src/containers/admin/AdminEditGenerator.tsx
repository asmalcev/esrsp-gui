import { Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import Button from '../../common/Button';
import InputBox from '../../common/InputBox';
import TextField from '../../common/TextField';
import { WideLayout } from '../Layout';

export type AdminEditType = {
	type: 'string' | 'generate';
	disabled?: boolean;
	validate?: (value) => { isOk: boolean; error: string };
	prepare?: (value) => any;
	generate?: (...props) => Promise<any>;
	generateButtonText?: string;
	inputType?: string;
};

export type AdminEditGeneratorType = {
	title: string;
	fields: Record<string, AdminEditType>;
	fetchUrl: string;
	hideSave?: boolean;
};

const AdminEditGenerator = ({
	title,
	fields,
	fetchUrl,
	hideSave,
}: AdminEditGeneratorType) => {
	return ({ data }) => {
		const storage = {};

		for (const field of Object.keys(fields)) {
			storage[field] = useState(data[field]);
		}

		const { enqueueSnackbar } = useSnackbar();

		const onSave = async (e) => {
			e.preventDefault();

			for (const field of Object.keys(fields)) {
				if (!fields[field].disabled && fields[field].validate) {
					const { isOk, error } = fields[field].validate(storage[field][0]);

					if (!isOk) {
						enqueueSnackbar(`Error: ${error}`, {
							variant: 'error',
						});
						return;
					}
				}
			}

			const body = {};
			for (const field of Object.keys(fields)) {
				body[field] = fields[field].prepare
					? fields[field].prepare(storage[field][0])
					: storage[field][0];
			}

			const res = await fetch(fetchUrl + String(data.id), {
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

		const onGenerate = async (field, e) => {
			e.preventDefault();

			const value = await fields[field]?.generate(data);
			storage[field][1](value);
		};

		const inputs = Object.keys(storage).map((field) => {
			if (fields[field].type === 'string') {
				return (
					<InputBox key={field}>
						<TextField
							label={field}
							value={storage[field][0]}
							disabled={fields[field].disabled}
							onChange={storage[field][1]}
							type={fields[field].inputType || 'text'}
						/>
					</InputBox>
				);
			} else if (fields[field].type === 'generate') {
				const onGenerateHandler = onGenerate.bind(null, field);

				return (
					<InputBox key={field}>
						<Paper variant="outlined" sx={{ p: 2 }}>
							{field}: {storage[field][0] || 'не сгенерированно'}
						</Paper>
						<Button onClick={onGenerateHandler}>
							{fields[field].generateButtonText}
						</Button>
					</InputBox>
				);
			}
		});

		return (
			<WideLayout>
				<Typography variant="h2">{title}</Typography>
				<form onSubmit={onSave}>
					{inputs}
					{!hideSave && (
						<InputBox>
							<Button type="submit">Сохранить</Button>
						</InputBox>
					)}
				</form>
			</WideLayout>
		);
	};
};

export default AdminEditGenerator;
