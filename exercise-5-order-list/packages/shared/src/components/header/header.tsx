import * as React from 'react';

import { inject, observer } from 'mobx-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { WithStyles, withStyles, StyledComponentProps } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography';
import { VisibilitySelector } from '../visibility-selector';
import { CommonStyles } from '../../styles';

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
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 30
    },
    headerButton: CommonStyles.marginRight(15),
    chip: {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.common.white
    }
});

const decorate = withStyles(styles);

export interface HeaderProps {
    rootStore?: any;
    children?: any;
    filters: any;
    selectedFilter: string;
}

export const Header = inject('rootStore')(
    decorate<HeaderProps>(
        observer(
            class extends React.Component<HeaderProps & WithStyles<'toolbar' | 'title' | 'textField' | 'headerButton' | 'chip'>> {
                state = {
                    numOrdersToCreate: 10,
                };
                onNumOrdersToCreateChanged = (numOrdersToCreate: any) => (event: React.ChangeEvent<any>): void => {
                    this.setState({
                    [numOrdersToCreate]: event.target.value,
                    });
                };
                render() {
                    const { classes, children, filters, selectedFilter } = this.props;
            
                    return (
                        <AppBar position="static" color="default">
                            <Toolbar className={classes.toolbar}>
                                <Typography variant="title" className={classes.title}>
                                    {children}
                                </Typography>
                                <VisibilitySelector filters={filters} value={selectedFilter} />
                                <TextField
                                    id="numOrdersToCreate"
                                    className={classes.textField}
                                    value={this.state.numOrdersToCreate}
                                    onChange={this.onNumOrdersToCreateChanged('numOrdersToCreate')}
                                />
                                <Button variant="contained" color="primary" className={classes.headerButton}>New Order</Button>
                                <Chip label={this.state.numOrdersToCreate} className={classes.chip} />
                            </Toolbar>
                        </AppBar>
                    );
                }
            }
        )
    )
);