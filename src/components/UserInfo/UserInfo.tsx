import { Typography, Button, Stack } from "@mui/material";
import { useApp, localStorageKeys } from "../../../pages/_app";

const UserInfo = () => {
	const { user, updateUser } = useApp();

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