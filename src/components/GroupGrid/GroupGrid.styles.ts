interface LayoutProps {
	columns: number;
}

const LayoutConsts = {
	firstColumnWidth: 30,
	cellHeight: 8.5,
	minCellWidth: 6
};

export default {
	gridLayout: (
		props : LayoutProps,
		{ theme }
	) => ({
		display: 'grid',
		gridTemplateColumns: `repeat(${props.columns}, max-content)`,

		paddingBottom: theme.spacing(1),
		marginRight: theme.spacing(LayoutConsts.minCellWidth),

		'&': {
			overflowX: 'auto'
		}
	}),

	gridCell: (
		props : LayoutProps,
		{ theme }
	) => ({
		minWidth: theme.spacing(LayoutConsts.minCellWidth),
		height: theme.spacing(LayoutConsts.cellHeight),
		padding: `${theme.spacing(3)} ${theme.spacing(2)}`,

		whiteSpace: 'nowrap',
		textAlign: 'center',

		/**
		 * Not first column
		 */
		[`&:not(:nth-of-type(${props.columns}n + 1))`]: {
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
			background: theme.palette.customBackground.dark
		},

		/**
		 * First column special css class
		 */
		'&.first-column': {
			overflow: 'hidden',

			width: theme.spacing(LayoutConsts.firstColumnWidth),
			border: 'none',

			textAlign: 'left',
			textOverflow: 'ellipsis',
		},

		/**
		 * First column special css class - only even rows
		 */
		'&.first-column:nth-of-type(2n)': {
			background: theme.palette.customBackground.dark
		},
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
	}),

	floatingStack: ({theme}) => ({
		width: theme.spacing(LayoutConsts.firstColumnWidth),

		'&': {
			position: 'relative',
		},

		'&::after': {
			content: `''`,
			position: 'absolute',
			top: 0,
			left: '100%',

			width: '10px',
			height: `calc(100% - ${theme.spacing(2)})`,
			background: 'linear-gradient(to right, #0001, #0000)',
		}
	}),
};
