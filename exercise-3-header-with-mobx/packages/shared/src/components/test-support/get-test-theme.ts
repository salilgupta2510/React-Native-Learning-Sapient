import { PaletteType } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import brown from '@material-ui/core/colors/brown';
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { Overrides } from '@material-ui/core/styles/overrides';

const paletteType: PaletteType = 'light';

const overrides: Overrides = {
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
    MuiFormControlLabel: {
        root: {
            marginLeft: -5
        },
        label: {
            color: grey[300],
            fontSize: 11,
            fontWeight: 500,
            fontFamily: 'Roboto',
            letterSpacing: 0,
            textTransform: 'capitalize'
        }
    }
};

export function getTestTheme(): Theme {
    const palette: PaletteOptions = {
        primary: {
            main: brown[700]
        },
        secondary: {
            main: orange.A400,
            dark: '#B26500'
        },
        error: {
            main: red.A400
        },
        background: {
            default: '#262626'
        },
        type: paletteType
    };
    return createMuiTheme({ palette, overrides });
}
