import {
	Stack,
	styled,
	List,
	ListItemButton,
	ListItemText,
	Autocomplete,
	TextField,
} from "@mui/material";

import Layout from "../Layout";
import { NextLinkComposed } from "../../components/NextLinkCompose";

import styles from './GroupsView.styles';

const GroupsView = ({
	groupsData
}) => {
	if (!groupsData) {
		groupsData = [];
	}

	/**
	 * styled components
	 */
	const StyledStack = styled(Stack)( styles.stack );
	const GroupListItem = styled(ListItemButton)( styles.groupListItem );
	const OptionLink = styled(NextLinkComposed)( styles.optionLink );


	const groups = groupsData.map(group =>
		<GroupListItem
			key={`${group.groupid}-${group.disciplineid}`}
			// @ts-ignore
			component={ NextLinkComposed }
			to={{
				pathname: `/groups/${group.groupid}/${group.disciplineid}`
			}}
		>
			<ListItemText>{`${group.groupname} - ${group.discipline}`}</ListItemText>
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
				to={{
					pathname: `/groups/${option.groupid}/${option.disciplineid}`
				}}
			>
				{`${option.groupname} - ${option.discipline}`}
			</OptionLink>
		);
	}

	const getOptionLabel = (
		option : { groupname, discipline }
	) => `${option.groupname} - ${option.discipline}`;

	return (
		<Layout>
			<StyledStack spacing={2}>
				<Autocomplete
					disableClearable
					options={ groupsData }
					getOptionLabel={ getOptionLabel }
					renderInput={ searchTextField }
					renderOption={ searchOption }
					noOptionsText="Не найдено"
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