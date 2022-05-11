export default {
	gridLayout: ({theme}) => ({
		display: 'grid',
		gridTemplateColumns: `${theme.spacing(40)} max-content`,
	}),

	overflowContainer: ({theme}) => ({
		// width: `calc(100% - ${theme.spacing(40)})`,
		width: theme.spacing(80),

		'&': {
			overflowX: 'auto'
		}
	}),

	gridContainer: ({theme}) => ({
		width: 'auto',
		// maxWidth: '100%',
		marginTop: 0,
		marginLeft: 0,
	}),

	firstColumnContainer: ({theme}) => ({
	}),

	gridCell: ({theme}) => ({
		minWidth: theme.spacing(10),
		padding: theme.spacing(1),
		border: '1px solid #000',

		'.MuiGrid-root &': {
			textAlign: 'center',
		}
	}),
};