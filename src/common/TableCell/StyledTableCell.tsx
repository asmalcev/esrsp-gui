import { styled, TableCell as MuiTableCell } from '@mui/material';
import TableCell from './TableCell';

const styles = ({ theme }) => ({
	borderRight: `1px solid`,
	borderColor: theme.palette._common.soft,

	color: theme.palette._common.black,
});

const StyledEditableTableCell = styled(TableCell)(styles);

const StyledTableCell = styled(MuiTableCell)(styles);

export { StyledEditableTableCell, StyledTableCell };
