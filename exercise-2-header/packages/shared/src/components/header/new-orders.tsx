import * as React from 'react';

import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { CommonStyles } from '../../styles';

const styles = (theme: Theme) => ({
    headerControls: Object.assign({}, CommonStyles.dislayInlineFlex, CommonStyles.flexAlignCenter),
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 30,
    },
    headerButton: CommonStyles.marginRight(15),
    chip: {
        backgroundColor: theme.palette.secondary.dark,
        fontSize: 11,
        fontWeight: 500,
        fontFamily: 'Roboto',
        letterSpacing: 0,
        color: '#ffffff'
    }
});

const decorate = withStyles(styles);

export const NewOrders = decorate(
    class extends React.Component<
            WithStyles<'headerControls' | 'textField' | 'headerButton' | 'chip'>> {
        state = {
            numOrdersToCreate: 10,
          };
        
          onNumOrdersToCreateChanged = (numOrdersToCreate: any) => (event: React.ChangeEvent<any>): void => {
            this.setState({
              [numOrdersToCreate]: event.target.value,
            });
          };
      render() {
        const { classes } = this.props;
        return (
            <div className={classes.headerControls}>
                <TextField
                id="numOrdersToCreate"
                className={classes.textField}
                value={this.state.numOrdersToCreate}
                onChange={this.onNumOrdersToCreateChanged('numOrdersToCreate')}
              />
                <Button className={classes.headerButton} color='primary' variant="contained">
                    New Orders
                </Button>
                <Chip label={this.state.numOrdersToCreate} className={classes.chip} />
            </div>
        );
      }
    }
  );