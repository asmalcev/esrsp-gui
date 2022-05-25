import {
	styled,
	Tooltip,
	TooltipProps,
	tooltipClasses
} from "@mui/material";

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip
		{...props}
		arrow
		classes={{ popper: className }}
		enterDelay={ 700 } />
))(({ theme }) => ({
	[`& .${tooltipClasses.arrow}`]: {
		color: theme.palette.common.black,
	},

	[`& .${tooltipClasses.tooltip}`]: {
		padding: theme.spacing(1),
		backgroundColor: theme.palette.common.black,

		fontSize: theme.typography.subtitle1.fontSize
	},
}));

export default StyledTooltip;