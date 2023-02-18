export default {
	cellInput: ({ theme }) => ({
		width: theme.spacing(6),
	}),

	sticky: ({ theme }) => ({
		left: 0,

		maxWidth: theme.spacing(25),
		backgroundColor: theme.palette.primary.main,

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

	cell: ({ theme }) => ({
		borderRight: `1px solid`,
		borderColor: theme.palette._common.soft,

		color: theme.palette._common.black,
	}),

	input: ({ theme }) => ({
		outline: 'none',

		width: theme.spacing(4),
		background: 'transparent',
		border: 'none',

		'&': {
			textAlign: 'center',
		},

		'&::-webkit-outer-spin-button': {
			WebkitAppearance: 'none',
		},
		'&::-webkit-inner-spin-button': {
			WebkitAppearance: 'none',
		},
	}),
};
