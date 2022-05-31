interface LayoutProps {
	columns: number;
}

export default {
	gridLayout: (
		props : LayoutProps,
		{ theme }
	) => ({
		display: 'grid',
		gridTemplateColumns: `${theme.spacing(30)} repeat(${props.columns - 1}, max-content)`,

		paddingBottom: theme.spacing(1),
		marginRight: theme.spacing(6),

		'&': {
			overflowX: 'auto'
		}
	}),

	gridCell: (
		props : LayoutProps,
		{ theme }
	) => ({
		minWidth: theme.spacing(6),
		padding: `${theme.spacing(3)} ${theme.spacing(2)}`,

		'&': {
			textAlign: 'center',
		},

		/**
		 * First column
		 */
		[`&:nth-of-type(${props.columns}n + 1)`]: {
			textAlign: 'left',
		},

		/**
		 * Not first column
		 */
		[`&:not(:nth-of-type(${props.columns}n + 1), :nth-of-type(${props.columns}n + 2))`]: {
			borderLeft: `0.5px solid ${theme.palette.primary.dark}`
		},

		/**
		 * Only even rows
		 */
		[
			Array.from(
				{length: props.columns},
				(_, i) => `&:nth-of-type(${props.columns * 2}n + ${i + 1 + props.columns})`
			).join(',')
		]: {
			background: 'rgba(0, 0, 0, 0.05)'
		},
		'&:hover': {
			// background: 'rgba(0, 0, 0, 0.1)'
		}
	}),

	iconsContainer: ({theme}) => ({
		'&': {
			position: 'fixed',
			right: theme.spacing(4)
		},

		'& .MuiIcon-root': {
			fontSize: theme.spacing(3.5)
		}
	}),

	cellInput: ({theme}) => ({
		width: theme.spacing(6)
	})
};
