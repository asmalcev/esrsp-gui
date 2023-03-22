import { Typography, Button, Stack } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const UserInfo = () => {
	const { user, logout } = useAuth();

	const onClick = () => {
		logout();
	};

	return (
		<Stack flexDirection="row" alignItems="center" p={2}>
			<Typography>{user.fullname || user.username}</Typography>
			<Button
				color="secondary"
				onClick={onClick}
				sx={{
					marginLeft: '16px',
				}}
			>
				Выйти
			</Button>
		</Stack>
	);
};

export default UserInfo;
