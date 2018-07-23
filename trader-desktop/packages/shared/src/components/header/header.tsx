import * as React from 'react';

import { inject, observer } from 'mobx-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { WithStyles, withStyles, StyledComponentProps } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { VisibilitySelector } from '../visibility-selector';
import { CommonStyles } from '../../styles';
import { OrderStore } from '../../stores/order.store';
import { VisibilityFilterEnum } from '../../constants';

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
    headerButton: CommonStyles.marginRight(15),
    chip: {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.common.white
    },
    numOrdersToCreate: {
        width: 50,
        marginRight: 15
    }
});

const decorate = withStyles(styles);

export interface HeaderProps {
    rootStore?: any;
    children?: any;
    selectedFilter: VisibilityFilterEnum;
}

export const Header = inject('rootStore')(
    decorate<HeaderProps>(
        observer(
            class extends React.Component<HeaderProps & WithStyles<'toolbar' | 'title' | 'headerButton' | 'chip' | 'numOrdersToCreate'>> {
                
                state: any;

                constructor(props: any) {
                    super(props);

                    this.state = {
                        numOrdersToCreate: 10,
                        visibilitySelector: this.props.selectedFilter || VisibilityFilterEnum.ALL
                    };
                }

                onNumOrdersToCreateChange(event: React.ChangeEvent<any>): void {
                    event.persist(); // Event pooling

                    this.setState(
                        { numOrdersToCreate: event.target.value },
                        () => (this.props.rootStore.orderStore as OrderStore).setNumOrdersToCreate(event.target.value)
                    );
                }

                onVisibilitySelectorChange(value: string) {
                    this.setState(
                        { visibilitySelector: value },
                        () => (this.props.rootStore.orderStore as OrderStore).setFilter(value as VisibilityFilterEnum)
                    );
                }

                createNewOrders() {
                    return (this.props.rootStore.orderStore as OrderStore).createOrdersAtServer(this.state.numOrdersToCreate);
                }

                resetOrders() {
                    const { rootStore: {orderStore }} = this.props;
                    
                    return orderStore.deleteAllOrders();
                }

                render() {
                    const { classes, children, selectedFilter, rootStore: { orderStore } } = this.props;
            
                    return (
                        <AppBar position="static" color="default">
                            <Toolbar className={classes.toolbar}>
                                <Typography variant="title" className={classes.title}>
                                    {children}
                                </Typography>
                                <VisibilitySelector filters={VisibilityFilterEnum} value={this.state.visibilitySelector} onChange={this.onVisibilitySelectorChange.bind(this)} onReset={this.resetOrders.bind(this)} />
                                <TextField id="numOrdersToCreate" className={classes.numOrdersToCreate} type="number" value={this.state.numOrdersToCreate} onChange={this.onNumOrdersToCreateChange.bind(this)} />
                                <Button variant="contained" color="primary" className={classes.headerButton} onClick={this.createNewOrders.bind(this)}>New Order</Button>
                                <Chip label={orderStore.count} className={classes.chip} />
                            </Toolbar>
                        </AppBar>
                    );
                }
            }
        )
    )
);