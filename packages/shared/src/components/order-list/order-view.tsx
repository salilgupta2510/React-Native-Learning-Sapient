import * as React from 'react';
import {
    WithStyles,
    withStyles,
    StyledComponentProps
} from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { JsOrder } from '../../domain/order';
import { OrderprogressBar } from './order-progress-bar';

const styles = (theme: Theme) => ({
    buyStyle: {
        fontFamily: 'Roboto',
        fontSize: 11,
        color: theme.palette.business.buyText,
        letterSpacing: 0,
        fontWeight: theme.typography.fontWeightBold
    },
    sellStyle: {
        fontFamily: 'Roboto',
        fontSize: 11,
        color: theme.palette.business.sellText,
        letterSpacing: 0,
        fontWeight: theme.typography.fontWeightBold
    },
    buyBackground: {
        backgroundColor: theme.palette.business.buyBackground
    },
    sellBackground: {
        backgroundColor: theme.palette.business.sellBackground
    },
    fontStyle: {
        fontWeight: theme.typography.fontWeightMedium,
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
    }
});

const decorate = withStyles(styles);

export interface OrderViewProps {
    order: JsOrder;
}

export const OrderView = decorate<OrderViewProps>(
    class extends React.Component<
        OrderViewProps &
            WithStyles<
                | 'tableRow'
                | 'quantity'
                | 'fontStyle'
                | 'symbol'
                | 'buyStyle'
                | 'sellStyle'
                | 'sellBackground'
                | 'buyBackground'
            >
    > {
        private quantityClass: string;
        private symbolClass: string;

        constructor(props: any) {
            super(props);

            this.quantityClass = `${props.classes.quantity} ${
                props.classes.fontStyle
            }`;
            this.symbolClass = `${props.classes.symbol} ${
                props.classes.fontStyle
            }`;
        }

        render() {
            const { classes, order } = this.props;

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
                    <TableCell className={this.symbolClass}>
                        {order.symbol}
                    </TableCell>
                    <TableCell className={this.quantityClass}>
                        {order.quantity}
                    </TableCell>
                    <TableCell className={this.quantityClass}>
                        {order.committed}
                    </TableCell>
                    <TableCell className={this.quantityClass}>
                        {order.executed}
                    </TableCell>
                    <TableCell style={{ width: '50%' }}>
                        <OrderprogressBar order={order} />
                    </TableCell>
                </TableRow>
            );
        }
    }
);
