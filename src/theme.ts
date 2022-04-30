import { createTheme } from "@mui/material";


declare module '@mui/material/styles' {
	interface Theme {
		boxShadow?: string;
		borderRadius?: string;
	}
	
	interface ThemeOptions {
		boxShadow: string;
		borderRadius: string;
	}

	interface BackgroundObject {
		main?: string;
		footer?: string;
		dark?: string;
	}

	interface Palette {
		customBackground: BackgroundObject;
	}

	interface PaletteOptions {
		customBackground?: BackgroundObject;
	}
}


export const theme = createTheme({
	typography: {
		fontFamily: '\'Inter\', sans-serif',
		// fontWeightLight: 600,
		// fontWeightMedium: 600,
		// fontWeightBold: 600,
		// fontWeightRegular: 600,

		h1: {
			fontSize: 24,
			color: '#000'
		},
		h2: {
			fontSize: 20,
		},
		subtitle1: {
			fontSize: 12,
			color: '#757575'
		}

	},
	palette: {
		customBackground: {
			main: '#FAFAFA',
			footer: '#EBEBEB',
			dark: 'rgba(0, 0, 0, 0.05)'
		},
		primary: {
			main: '#fff',
			dark: '#757575'
		},
		secondary: {
			main: '#4FC3F7'
		}
	},
	boxShadow: '0 0 5px rgba(0, 0, 0, 0.05)',
	borderRadius: '4px'
});