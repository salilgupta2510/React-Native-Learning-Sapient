import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export interface HeaderProps {
    children?: any;
    controls?: any;
}

const styles = (theme: any) => ({
    root: {
        display: 'flex'
    },
    formControl: {
        margin: theme.spacing.unit * 3
    },
    group: {
        margin: `${theme.spacing.unit}px 0`
    }
});

export class Header extends React.Component<HeaderProps> {
    render() {
        const { children, controls } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        {children}
                    </Typography>
                    {controls}
                </Toolbar>
            </AppBar>
        );
    }
}
