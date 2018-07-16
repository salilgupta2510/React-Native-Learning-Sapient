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
            color: grey[50]
        },
        root: {
            color: grey[50]
        },
        checked: {
            color: grey[50]
        }
    },
    MuiFormControlLabel: {
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
