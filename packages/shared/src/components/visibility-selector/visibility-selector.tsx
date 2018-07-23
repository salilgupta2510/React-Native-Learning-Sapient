import * as React from 'react';

import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { CommonStyles } from '../../styles';

const styles = (theme: Theme) => ({
    headerControls: Object.assign({}, CommonStyles.dislayInlineFlex),
    checked: {
        color: theme.palette.grey[300]
    },
    headerButton: CommonStyles.marginRight(15)
});

const decorate = withStyles(styles);

export interface VisibilityProps {
    value: string;
    filters: any;
    onChange?: (value: string) => any;
    onReset: () => any;
}

export const VisibilitySelector = decorate<VisibilityProps>(
    class extends React.Component<
        VisibilityProps &
            WithStyles<'headerControls' | 'checked' | 'headerButton'>
    > {
        state = {
            selectedValue: this.props.filters[this.props.value]
        };

        handleChange = (event: React.ChangeEvent<any>): void => {
            event.persist();
            this.setState(
                { selectedValue: event.target.value },
                () =>
                    this.props.onChange &&
                    this.props.onChange(event.target.value)
            );
        };

        render() {
            const { classes, filters, onReset } = this.props;
            return (
                <div className={classes.headerControls}>
                    <RadioGroup
                        aria-label="Filter"
                        name="filter"
                        style={{ flexDirection: 'row' }}
                        value={this.state.selectedValue}
                        onChange={this.handleChange}
                    >
                        {Object.keys(filters).map(filter => (
                            <FormControlLabel
                                key={filter}
                                value={filter}
                                control={
                                    <Radio
                                        classes={{
                                            checked: classes.checked
                                        }}
                                    />
                                }
                                label={filter}
                            />
                        ))}
                    </RadioGroup>
                    <Button className={classes.headerButton} onClick={onReset}>
                        Reset
                    </Button>
                </div>
            );
        }
    }
);
