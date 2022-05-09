import {
	Stack,
	styled,
	List,
	ListItemButton,
	ListItemText,
	Autocomplete,
	TextField
} from "@mui/material";

import Layout from "../Layout";
import { NextLinkComposed } from "../../components/NextLinkCompose";

import styles from './GroupsView.styles';

const GroupsView = ({
	groupsData
}) => {

	const StyledStack = styled(Stack)( styles.stack );
	const GroupListItem = styled(ListItemButton)( styles.groupListItem );
	const OptionLink = styled('a')( styles.optionLink );


	const groups = groupsData.map(group =>
		<GroupListItem
			key={ group.id }
			// @ts-ignore
			component={ NextLinkComposed }
			to={{
				pathname: `/groups/${group.id}`
			}}
		>
			<ListItemText>{ group.name }</ListItemText>
		</GroupListItem>
	);

	const searchTextField = params => (
		<TextField
			{...params}
			label="Найти группу"
			color="secondary"
			InputProps={{
				...params.InputProps,
				type: 'search',
			}}
		/>
	);

	const searchOption = (params, option, state) => {
		return (
			<OptionLink
				{...params}
				href={`/groups/${option.id}`}
			>{
				option.name
			}</OptionLink>
		);
	}

	return (
		<Layout>
			<StyledStack spacing={2}>
				<Autocomplete
					freeSolo
					disableClearable
					options={ groupsData }
					getOptionLabel={ (option : { name }) => option.name }
					renderInput={ searchTextField }
					renderOption={ searchOption }
				/>
				<List>
					{
						groups
					}
				</List>
			</StyledStack>
		</Layout>
	)
};

export default GroupsView;