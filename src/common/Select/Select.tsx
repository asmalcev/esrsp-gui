import { useState } from 'react';

import { Select as MuiSelect, SelectChangeEvent } from '@mui/material';

const Select = (props) => {
	const { selectValue, shouldClear, ...other } = props;

	const [value, setValue] = useState(selectValue);

	const onChange = (event: SelectChangeEvent) => {
		const value = event.target.value;
		if (shouldClear && shouldClear(value)) {
			setValue('');
		} else {
			setValue(value);
		}
	};

	return <MuiSelect onChange={onChange} value={value} {...other} />;
};

export default Select;
