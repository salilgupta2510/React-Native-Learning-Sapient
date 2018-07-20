import * as React from 'react';
import { WithStyles, withStyles, StyledComponentProps } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

const styles = (theme: Theme) => ({
    table: {
      width: '100%',
    },
});

const decorate = withStyles(styles);

export interface OrderViewProps {
  orders: any[]
}

export const OrderView = decorate<OrderViewProps>(
    class extends React.Component<OrderViewProps & WithStyles<'table'>> {
        render() {
            const { classes, orders } = this.props;
            return (
                <TableBody>
                    {orders.map(order => {
                        return (
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {order.side}
                            </TableCell>
                            <TableCell>{order.symbol}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>{order.committed}</TableCell>
                            <TableCell>{order.executed}</TableCell>
                        </TableRow>
                        );
                    })}
                </TableBody>
            );
        }
    }
)
