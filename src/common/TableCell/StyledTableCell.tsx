import { styled } from '@mui/material';
import TableCell from './TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	borderRight: `1px solid`,
	borderColor: theme.palette._common.soft,

	color: theme.palette._common.black,
}));

export default StyledTableCell;
