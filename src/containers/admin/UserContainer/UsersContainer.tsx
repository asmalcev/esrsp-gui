import {
	Alert,
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import Link from 'next/link';
import { StyledTableCell } from '../../../common/TableCell';
import { User, UserRole } from '../../../contexts/AuthContext';
import { WideLayout } from '../../Layout';

const UsersContainer = ({ data }: { data: User[] }) => {
	const users = data.map((d) => (
		<TableRow key={d.id}>
			<StyledTableCell>{`${d.id}`}</StyledTableCell>
			<StyledTableCell>{d.username}</StyledTableCell>
			<StyledTableCell>{UserRole[d.role]}</StyledTableCell>
			<StyledTableCell>
				<Link href={`/admin/users/${d.id}`}>Изменить</Link>
			</StyledTableCell>
		</TableRow>
	));

	return (
		<WideLayout>
			<Typography variant="h2">Управление пользователями</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableCell>id</StyledTableCell>
							<StyledTableCell>username</StyledTableCell>
							<StyledTableCell>role</StyledTableCell>
							<StyledTableCell>action</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>{users}</TableBody>
				</Table>
			</TableContainer>
		</WideLayout>
	);
};

export default UsersContainer;
