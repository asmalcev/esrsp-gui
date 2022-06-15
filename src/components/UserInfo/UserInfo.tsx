import { Typography, Button, Stack } from "@mui/material";
import { useAuth, localStorageKeys } from "../../contexts/AuthContext";

const UserInfo = () => {
	const { user, updateUser } = useAuth();

	const onClick = () => {
		window.localStorage.removeItem(localStorageKeys.jwt);
		updateUser({
			loggedin: false
		});
	}

	return <Stack
		flexDirection="row"
		alignItems="center"
	>
		<Typography>{ user.name }</Typography>
		<Button
			color="secondary"
			onClick={onClick}
			sx={{
				marginLeft: '16px'
			}}
		>Выйти</Button>
	</Stack>;
}

export default UserInfo;