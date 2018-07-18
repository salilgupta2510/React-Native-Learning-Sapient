import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography';
import { VisibilitySelector } from './visibility-selector';
import { NewOrders } from './new-orders';

const styles = (theme: Theme) => ({
    toolbar: {
        minHeight: 50,
        backgroundColor: theme.palette.grey[900]
    },
    title: {
        color: theme.palette.grey[300],
        fontSize: 13,
        fontWeight: 500,
        flex: 1,
        fontFamily: 'Roboto',
        letterSpacing: 0
    }
});

const decorate = withStyles(styles);

export interface HeaderProps {
    children?: any;
}

export const Header = decorate<HeaderProps>(
    class extends React.Component<
        HeaderProps & WithStyles<'toolbar' | 'title'>
    > {
        render() {
            const { classes, children } = this.props;

            return (
                <AppBar position="static" color="default">
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="title" className={classes.title}>
                            {children}
                        </Typography>
                        <VisibilitySelector />
                        <NewOrders />
                    </Toolbar>
                </AppBar>
            );
        }
    }
);
