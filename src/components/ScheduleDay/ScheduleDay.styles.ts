export default {
	dayName: ({theme}) => ({
		marginTop: theme.spacing(4),

		scrollMarginTop: theme.spacing(2)
	}),

	zeroLessons: ({theme}) => ({
		margin: `${theme.spacing(2)} 0`,

		color: theme.palette.primary.dark
	})
};