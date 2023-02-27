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

		height: theme.spacing(theme.layout.headerHeight),
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

	footerContainer: ({ theme }) => ({
		color: theme.palette.primary.dark,
	}),

	mobileContentContainer: ({ theme }): any => ({
		overflowX: 'hidden',
		overflowY: 'scroll',

		height: `calc(100vh - ${theme.spacing(theme.layout.headerHeight)})`,
		marginTop: theme.spacing(theme.layout.headerHeight),
		padding: theme.spacing(2),
		backgroundColor: theme.palette.customBackground.main,
		boxShadow: `inset ${theme.boxShadow}`,
	}),

	relativeHeader: ({ theme }) => ({
		'&': {
			position: 'relative',
		},
	}),
};
