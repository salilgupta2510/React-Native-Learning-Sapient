import * as React from 'react';

import { inject, observer } from 'mobx-react';
import {
    WithStyles,
    withStyles,
    StyledComponentProps
} from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import { OrderView } from './OrderView';

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
    children?: any;
    filters: any;
    selectedFilter: string;
}

export const OrderList = inject('rootStore')(
    decorate<OrderProps>(
        observer(
            class extends React.Component<
                OrderProps & WithStyles<'table' | 'tableHead' | 'tableRow'>
            > {
                render() {
                    const orders = [
                        {
                            side: 'BUY',
                            symbol: 'AAPL',
                            quantity: 80000,
                            committed: 60000,
                            executed: 20000
                        },
                        {
                            side: 'SELL',
                            symbol: 'MSFT',
                            quantity: 90000,
                            committed: 70000,
                            executed: 50000
                        }
                    ];
                    const { classes } = this.props;
                    const orderKeys = Object.keys(orders[0]);
                    return (
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow className={classes.tableHead}>
                                    {orderKeys.map(order => {
                                        return (
                                            <TableCell
                                                className={classes.tableRow}
                                            >
                                                {order}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                            <OrderView orders={orders} />
                        </Table>
                    );
                }
            }
        )
    )
);
