import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { WithStyles, withStyles, StyledComponentProps } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import { OrderView } from './order-view';
import { OrderStore } from '../../stores/order.store';
import { JsOrder, Order } from '../../domain/order';

const styles = (theme: Theme) => ({
    table: {
        width: '100%',
        backgroundColor: theme.palette.grey[850]
    },
    tableHead: {
        fontSize: 11,
        fontFamily: 'Roboto',
        letterSpacing: 0,
        color: '#757575',
        height: 'auto'
    },
    tableBody: {
        backgroundColor: theme.palette.grey[750]
    },
    tableRow: {
        textOverflow: 'ellipses',
        width: '10%',
        height: '29px',
        padding: '8px'
    }
});

const decorate = withStyles(styles);

export interface OrderProps {
    rootStore?: any;
}

export const OrderList = inject('rootStore')(
    decorate<OrderProps>(
        observer(
            class extends React.Component<OrderProps & WithStyles<'table' | 'tableHead' | 'tableBody' | 'tableRow'>> {
                render() {
                    const { classes, rootStore: { orderStore } } = this.props;

                    return (
                        <Table className={classes.table}>
                            <TableHead className={classes.tableHead}>
                                <TableRow className={classes.tableRow}>
                                    <TableCell>Side</TableCell>
                                    <TableCell>Symbol</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Commited</TableCell>
                                    <TableCell>Executed</TableCell>
                                    <TableCell style={{width: '50%'}}>Progress</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className={classes.tableBody}>
                                {(orderStore as OrderStore).getVisibleOrders().map((order: Order) => <OrderView order={order.serialize()} key={order.id} />)}
                            </TableBody>
                        </Table>
                    );
                }
            }
        )
    )
)