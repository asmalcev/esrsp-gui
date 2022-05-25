export default {
	layout: ({theme}) => ({
		paddingTop: theme.spacing(4),
		paddingRight: theme.spacing(2),

		'&': {
			flexDirection: 'column',
			gap: theme.spacing(2),
		}
	})
};