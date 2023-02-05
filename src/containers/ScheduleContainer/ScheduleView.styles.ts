export default {
	daysContainer: ({ theme }) => ({
		width: theme.spacing(54),
	}),

	datePickerContainer: ({ theme }) => ({
		left: theme.spacing(116),
		top: theme.spacing(14),

		width: theme.spacing(30),

		'&': {
			position: 'fixed',
		},
	}),
};
