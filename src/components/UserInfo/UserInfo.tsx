import { Typography, Button, Stack } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const UserInfo = () => {
	const { user, updateUser } = useAuth();

	const onClick = () => {
		const logout = async () => {
			await fetch('/api/auth/logout', {
				method: 'POST',
			});
		};

		logout();
		updateUser({
			loggedin: false,
		});
	};

	return (
		<Stack flexDirection="row" alignItems="center">
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
