export default {
	gridContainer: ({theme}) => ({
		display: 'grid',
		gridTemplateColumns: 'repeat(12, 1fr)', 
		gridTemplateRows: 'max-content 1fr', 

		height: '100vh',
		padding: '0'
	}),

	appBar: ({theme}) => ({
		gridColumn: '1 / 13',

		padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
		boxShadow: 'none',

		'&': {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
		}
	}),

	menu: ({theme}) => ({
		gridColumn: '1 / 3',

		height: '100%',

		'& .MuiListItemButton-root.Mui-selected, & .MuiListItemButton-root.Mui-selected:hover': {
			backgroundColor: theme.palette.customBackground.dark
		}
	}),

	contentContainer: ({theme}) : any => ({
		gridColumn: '3 / 13',

		overflowX: 'hidden',
		overflowY: 'scroll',

		padding: theme.spacing(2),
		backgroundColor: theme.palette.customBackground.main,
		boxShadow: `inset ${theme.boxShadow}`,
	}),

	footer: ({theme}) => ({
		padding: theme.spacing(2),
		backgroundColor: theme.palette.customBackground.footer,
	}),

	footerContainer: ({theme}) => ({
		color: theme.palette.primary.dark
	}),
};