import { createTheme } from "@mui/material";

export const theme = createTheme({
	typography: {
		fontFamily: '\'Inter\', sans-serif',

		h1: {
			fontSize: 24,
		},
		subtitle2: {
			fontSize: 12
		}

	},
	palette: {
		background: {
			main: '#FAFAFA',
			footer: '#EBEBEB'
		},
		primary: {
			main: '#fff',
			dark: '#757575'
		},
		secondary: {
			main: '#4FC3F7'
		}
	},
	boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.05)'
});