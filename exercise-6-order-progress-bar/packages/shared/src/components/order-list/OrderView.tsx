import * as React from 'react';
import {
    WithStyles,
    withStyles,
    StyledComponentProps
} from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import { OrderprogressBar } from './OrderprogressBar';

const styles = (theme: Theme) => ({
    tableBody: {
        backgroundColor: theme.palette.grey[750]
    },
    buyStyle: {
        fontFamily: 'Roboto',
        fontSize: 11,
        color: theme.palette.business.buyText,
        letterSpacing: 0,
        width: '10%',
        height: '18px',
        fontWeight: theme.typography.fontWeightBold,
        padding: '2.5px 8px'
    },
    sellStyle: {
        fontFamily: 'Roboto',
        fontSize: 11,
        color: theme.palette.business.sellText,
        letterSpacing: 0,
        width: '10%',
        height: '18px',
        fontWeight: theme.typography.fontWeightBold,
        padding: '2.5px 8px'
    },
    buyBackground: {
        backgroundColor: theme.palette.business.buyBackground
    },
    sellBackground: {
        backgroundColor: theme.palette.business.sellBackground
    },
    fontStyle: {
        width: '10%',
        height: '18px',
        fontWeight: theme.typography.fontWeightMedium,
        padding: '2.5px 8px',
        fontFamily: 'Roboto',
        fontSize: 11,
        letterSpacing: 0
    },
    symbol: {
        color: '#FFFFFF'
    },
    quantity: {
        color: 'rgba(255,255,255,0.70)'
    },
    tableRow: {
        height: 'auto'
    },
    container: {
        width: '50%',
        height: '18px',
        padding: '2.5px 8px',
    }
});

const decorate = withStyles(styles);

export interface OrderViewProps {
    orders: any[];
}

export const OrderView = decorate<OrderViewProps>(
    class extends React.Component<
        OrderViewProps &
            WithStyles<
                | 'tableBody'
                | 'tableRow'
                | 'quantity'
                | 'fontStyle'
                | 'symbol'
                | 'buyStyle'
                | 'sellStyle'
                | 'sellBackground'
                | 'buyBackground'
                | 'container'
            >
    > {
        render() {
            const { classes, orders } = this.props;
            const quantityClass = `${classes.quantity} ${classes.fontStyle}`;
            const symbolClass = `${classes.symbol} ${classes.fontStyle}`;
            return (
                <TableBody className={classes.tableBody}>
                    {orders.map(order => {
                        return (
                            <TableRow className={classes.tableRow}>
                                <TableCell
                                    className={
                                        order.side === 'BUY'
                                            ? classes.buyStyle
                                            : classes.sellStyle
                                    }
                                >
                                    {order.side}
                                </TableCell>
                                <TableCell className={symbolClass}>
                                    {order.symbol}
                                </TableCell>
                                <TableCell className={quantityClass}>
                                    {order.quantity}
                                </TableCell>
                                <TableCell className={quantityClass}>
                                    {order.committed}
                                </TableCell>
                                <TableCell className={quantityClass}>
                                    {order.executed}
                                </TableCell>
                                <TableCell className={classes.container}>
                                    <OrderprogressBar order={order}/>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            );
        }
    }
);
