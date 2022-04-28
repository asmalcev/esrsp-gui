export default {
	container: ({theme}) => ({
		display: 'flex',

		padding: theme.spacing(2),
		margin: `${theme.spacing(2)} 0`,
		boxShadow: theme.boxShadow
	}),
	content: ({theme}) => ({
		marginLeft: theme.spacing(2),
		'& .MuiTypography-body1': {
			marginBottom: theme.spacing(2)
		}
	}),
};