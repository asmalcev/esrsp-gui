export default {
	gridContainer: ({ theme }) => ({
		display: 'grid',
		gridTemplateColumns: `${theme.spacing(
			theme.layout.sidebarWidth,
		)} repeat(12, 1fr)`,
		gridTemplateRows: `${theme.spacing(theme.layout.headerHeight)} 1fr`,

		height: '100vh',
		padding: '0',
	}),

	appBar: ({ theme }) => ({
		gridColumn: '1 / 14',

		padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
		boxShadow: 'none',

		'&': {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
	}),

	menu: ({ theme }) => ({
		gridColumn: '1 / 2',

		height: '100%',

		'& .MuiListItemButton-root.Mui-selected, & .MuiListItemButton-root.Mui-selected:hover':
			{
				backgroundColor: theme.palette.customBackground.dark,
			},
	}),

	contentContainer: ({ theme }): any => ({
		gridColumn: '2 / 14',

		overflowX: 'hidden',
		overflowY: 'scroll',

		padding: theme.spacing(2),
		backgroundColor: theme.palette.customBackground.main,
		boxShadow: `inset ${theme.boxShadow}`,
	}),

	footer: ({ theme }) => ({
		padding: theme.spacing(2),
		backgroundColor: theme.palette.customBackground.footer,
	}),

	footerContainer: ({ theme }) => ({
		color: theme.palette.primary.dark,
	}),

	adminBlock: ({ theme }) => ({
		marginTop: theme.spacing(4),

		'& .MuiTypography-body1': {
			paddingLeft: theme.spacing(1),

			color: theme.palette.primary.dark,
		},
	}),
};
