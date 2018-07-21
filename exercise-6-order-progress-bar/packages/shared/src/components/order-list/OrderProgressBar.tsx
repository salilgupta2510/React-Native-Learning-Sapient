import * as React from 'react';
import {
    WithStyles,
    withStyles,
    StyledComponentProps
} from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) => ({
    buyBackground: {
        backgroundColor: theme.palette.business.buyBackground
    },
    sellBackground: {
        backgroundColor: theme.palette.business.sellBackground
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    notDone: {
        backgroundColor: theme.palette.business.notDone
    },
    uncommitted: {
        backgroundColor: theme.palette.business.uncommitted
    }
});

const decorate = withStyles(styles);

export interface OrderBarProps {
    order?: any;
}

export const OrderprogressBar = decorate<OrderBarProps>(
    class extends React.Component<
        OrderBarProps &
            WithStyles<'sellBackground' | 'buyBackground' | 'container' | 'notDone' | 'uncommitted'>
    > {
        render() {
            const { classes, order } = this.props;
            const { quantity, committed, executed } = order;
            const doneWidth = (executed/quantity) * 100;
            const notDoneWidth = ((quantity - executed) / quantity) * 100;
            const uncommittedWidth = ((quantity - committed) / quantity) * 100;            
            return (
                <div className={classes.container}>
                    <div style={{width: `${doneWidth}%`, height: '100%'}} className={order.side === 'BUY'? classes.buyBackground: classes.sellBackground}></div>
                    <div style={{width: `${notDoneWidth}%`, height: '100%'}} className={classes.notDone}></div>
                    <div style={{width: `${uncommittedWidth}%`, height: '100%'}} className={classes.uncommitted}></div>
                </div>
            );
        }
    }
);