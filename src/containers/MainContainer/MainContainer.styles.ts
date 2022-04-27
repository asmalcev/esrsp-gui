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

		padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
		boxShadow: 'none'
	}),
	list: ({theme}) => ({
		gridColumn: '1 / 3',
		height: '100%'
	}),
	contentContainer: ({theme}) => ({

	}),
};