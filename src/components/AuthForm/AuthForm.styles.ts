export default {
	container: ({theme}) => ({
		height: '100vh',

		backgroundColor: theme.palette.customBackground.main
	}),

	paper: ({theme}) => ({
		width: theme.spacing(48),

		padding: theme.spacing(4),
		boxShadow: theme.boxShadow,
	}),

	inputBox: ({theme}) => ({
		width: theme.spacing(40),
		margin: `${theme.spacing(4)} 0`
	})
};