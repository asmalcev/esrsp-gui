import { Typography } from "@mui/material";
import { useApp } from "../../../pages/_app";

const UserInfo = () => {
	const { user } = useApp();
	// console.log(user);

	return <div>
		<Typography>{ user.name }</Typography>
	</div>;
}

export default UserInfo;