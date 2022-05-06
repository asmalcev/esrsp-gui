export default {
	layout: ({theme}) => ({
		display: 'flex',

		paddingLeft: theme.spacing(22),

		'&': {
			position: 'relative',
		}
	}),

	daysContainer: ({theme}) => ({
		width: theme.spacing(54)
	}),

	datePickerContainer: ({theme}) => ({
		left: theme.spacing(80),
		top: theme.spacing(4),

		width: theme.spacing(30),

		'&': {
			position: 'absolute',
		}
	}),
};