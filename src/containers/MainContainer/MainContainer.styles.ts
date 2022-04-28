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
		boxShadow: 'none'
	}),
	menu: ({theme}) => ({
		gridColumn: '1 / 3',

		height: '100%'
	}),
	contentContainer: ({theme}) => ({
		gridColumn: '3 / 13',

		padding: theme.spacing(2),
		backgroundColor: theme.palette.background.main,
		boxShadow: theme.boxShadow
	}),
	logo: ({theme}) => ({
		color: theme.palette.primary.contrastText
	}),
	footer: ({theme}) => ({
		padding: theme.spacing(2),
		backgroundColor: theme.palette.background.footer,
	}),
	footerContainer: ({theme}) => ({
		color: theme.palette.primary.dark
	}),
};