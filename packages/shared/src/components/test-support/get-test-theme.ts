import { PaletteType, colors } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { Overrides } from '@material-ui/core/styles/overrides';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';

// Extend Color with 650, 750 & 850 options
declare module '@material-ui/core' {
    interface Color {
        750?: string;
        850?: string;
    }
}

// Extend Palette with business colors
declare module '@material-ui/core/styles/createPalette' {
    interface Palette {
        business: {
            buyBackground: string;
            buyText: string;
            sellBackground: string;
            sellText: string;
            notDone: string;
            uncommitted: string;
        };
    }

    interface PaletteOptions {
        business: {
            buyBackground: string;
            buyText: string;
            sellBackground: string;
            sellText: string;
            notDone: string;
            uncommitted: string;
        };
    }
}

// Extend Typography with fontWeightBold
declare module '@material-ui/core/styles/createTypography' {
    interface FontStyle {
        fontWeightBold: React.CSSProperties['fontWeight'];
    }
}

const typography: TypographyOptions = {
    fontWeightBold: 700
};

const paletteType: PaletteType = 'dark';

const overrides: Overrides = {
    MuiAppBar: {
        colorPrimary: {
            color: grey[50],
            backgroundColor: grey[900]
        }
    },
    MuiButton: {
        root: {
            // Button text should not be all upper case
            textTransform: 'none'
        }
    },
    MuiToolbar: {
        root: {
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    },
    MuiRadio: {
        colorPrimary: {
            color: grey[300]
        },
        colorSecondary: {
            '&$checked': {
                color: grey[300]
            }
        },
        root: {
            color: grey[300],
            '&$checked': {
                color: grey[300]
            }
        },
        checked: {
            color: grey[300]
        }
    },
    MuiFormControlLabel: {
        root: {
            margin: 0
        },
        label: {
            color: grey[50]
        }
    }
};

const palette: PaletteOptions = {
    primary: {
        main: '#5D4037',
        dark: '#3E2723'
    },
    secondary: {
        main: '#FF3D00',
        dark: '#B26500'
    },
    error: {
        main: red.A400
    },
    common: {
        white: grey[50],
        black: grey[900]
    },
    grey: {
        750: '#575757',
        850: '#383838'
    },
    business: {
        buyBackground: '#66a989',
        buyText: '#80b79d',
        sellBackground: '#fcaf17',
        sellText: '#e57a00',
        notDone: '#404040',
        uncommitted: '#000000'
    },
    background: {
        default: '#262626'
    },
    type: paletteType
};

export function getTestTheme(): Theme {
    return createMuiTheme({ palette, overrides, typography });
}
