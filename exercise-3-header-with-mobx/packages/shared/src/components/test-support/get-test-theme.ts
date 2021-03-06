import { PaletteType, colors } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { Overrides } from '@material-ui/core/styles/overrides';

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
            textTransform: 'none',
            fontFamily: 'Roboto',
            fontSize: 11,
            color: '#FFFFFF',
            letterSpacing: 0,
            fontWeight: 500,
            minHeight: 21,
            height: 21,
            padding: '3px 8px'
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
    MuiInput: {
        input: {
            fontFamily: 'Roboto',
            fontSize: 11,
            color: '#FFFFFF',
            letterSpacing: 0,
            fontWeight: 500,
            textAlign: 'right',
            padding: 0
        },
        underline: {
            '&:before': {
                borderBottom: '1px solid #ffffff'
            },
            '&:hover': {
                borderBottom: '1px solid #ffffff'
            },
            '&:after': {
                borderBottom: '1px solid #ffffff'
            }
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
    type: paletteType
};

export function getTestTheme(): Theme {
    return createMuiTheme({ palette, overrides });
}
