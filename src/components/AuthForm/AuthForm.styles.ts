export default {
	container: ({ theme }) => ({
		height: '100vh',

		backgroundColor: theme.palette.customBackground.main,
	}),

	paper: ({ theme }) => ({
		maxWidth: theme.spacing(48),
		width: '100%',

		padding: theme.spacing(4),
		boxShadow: theme.boxShadow,
	}),
};
