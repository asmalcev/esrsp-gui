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

const StyledStack = styled(Stack)( styles.stack );
const GroupListItem = styled(ListItemButton)( styles.groupListItem );
const OptionLink = styled(NextLinkComposed)( styles.optionLink );

const GroupsView = ({
	groupsData
}) => {
	if (!groupsData) {
		groupsData = [];
	}

	const groups = groupsData.map(group =>
		<GroupListItem
			key={`${group.groupid}-${group.disciplineid}`}
			// @ts-ignore
			component={ NextLinkComposed }
			to={{
				pathname: `/group/${group.studentGroupId}/${group.disciplineId}`
			}}
		>
			<ListItemText>{`${group.studentGroup} - ${group.discipline}`}</ListItemText>
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
					pathname: `/group/${option.studentGroupId}/${option.disciplineId}`
				}}
			>
				{`${option.studentGroup} - ${option.discipline}`}
			</OptionLink>
		);
	}

	const getOptionLabel = (
		option : { studentGroup, discipline }
	) => `${option.studentGroup} - ${option.discipline}`;

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