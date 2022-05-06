export default {
	stack: ({theme}) => ({
		width: theme.spacing(54)
	}),

	groupListItem: ({theme}) => ({
		padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
		margin: `${theme.spacing(2)} 0`,
		backgroundColor: theme.palette.primary.main,
		boxShadow: theme.boxShadow,
		borderRadius: theme.borderRadius
	})
};