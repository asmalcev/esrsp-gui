export default {
	sticky: ({ theme }) => ({
		left: 0,

		maxWidth: theme.spacing(25),
		backgroundColor: theme.palette.primary.main,

		fontSize: '0.8rem',

		'&': {
			overflow: 'hidden',
			position: 'sticky',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
		},
	}),

	tableContainer: ({ theme }) => ({
		'&': {
			maxHeight: `calc(100vh - ${theme.spacing(
				theme.layout.headerHeight + 15,
			)})`,
		},
	}),

	row: ({ theme }) => ({
		'&:hover': {
			backgroundColor: theme.palette.customBackground.dark,
		},
	}),
};
