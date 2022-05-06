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

import styles from './GroupsView.styles';

const GroupsView = ({
	groupsData
}) => {

	const StyledStack = styled(Stack)( styles.stack );
	const GroupListItem = styled(ListItemButton)( styles.groupListItem );

	const groups = groupsData.map(group =>
		<GroupListItem
			key={ group.id }
		>
			<ListItemText>{ group.name }</ListItemText>
		</GroupListItem>
	);

	return (
		<Layout>
			<StyledStack spacing={2}>
				<Autocomplete
					freeSolo
					disableClearable
					options={ groupsData.map(option => option.name) }
					renderInput={(params) => (
						<TextField
							{...params}
							label="Найти группу"
							color="secondary"
							InputProps={{
								...params.InputProps,
								type: 'search',
							}}
						/>
					)}
				/>
				<List>
					{ groups }
				</List>
			</StyledStack>
		</Layout>
	)
};

export default GroupsView;