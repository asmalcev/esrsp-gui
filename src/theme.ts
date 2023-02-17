import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
	interface Theme {
		boxShadow?: string;
		borderRadius?: string;
		layout?: Layout;
	}

	interface ThemeOptions {
		boxShadow?: string;
		borderRadius?: string;
		layout?: Layout;
	}

	interface BackgroundObject {
		main?: string;
		footer?: string;
		dark?: string;
	}

	interface Common {
		soft?: string;
		hard?: string;
		black?: string;
	}

	interface Palette {
		customBackground?: BackgroundObject;
		_common?: Common;
	}

	interface PaletteOptions {
		customBackground?: BackgroundObject;
		_common?: Common;
	}

	interface Components {
		MuiPickersDay?: any;
	}

	interface Layout {
		headerHeight?: number;
		sidebarWidth?: number;
	}
}

export const theme = createTheme({
	typography: {
		fontFamily: "'Inter', sans-serif",

		h1: {
			fontSize: 24,
			color: '#000',
		},
		h2: {
			fontSize: 20,
		},
		subtitle1: {
			fontSize: 12,
			color: '#757575',
		},
	},
	palette: {
		customBackground: {
			main: '#FAFAFA',
			footer: '#EBEBEB',
			dark: 'rgba(0, 0, 0, 0.05)',
		},
		primary: {
			main: '#fff',
			dark: '#757575',
		},
		secondary: {
			main: '#4FC3F7',
			contrastText: '#fff',
		},
		_common: {
			soft: '#75757544',
			hard: '#757575aa',
			black: '#000',
		}
	},
	boxShadow: '0 0 5px rgba(0, 0, 0, 0.05)',
	borderRadius: '4px',
	layout: {
		headerHeight: 7,
		sidebarWidth: 28,
	},

	components: {
		MuiPickersDay: {
			styleOverrides: {
				root: {
					'&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus': {
						backgroundColor: '#4FC3F7',
					},
				},
			},
		},
	},
});

export const contrastTheme = createTheme(theme, {
	palette: {
		customBackground: {
			dark: 'rgba(0, 0, 0, 0.1)',
		},
	},
	boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
});
