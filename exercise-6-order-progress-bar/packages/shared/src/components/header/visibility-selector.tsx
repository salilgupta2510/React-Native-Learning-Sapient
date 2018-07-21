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
import { VisibilityFilter } from '../../domain/types';
import { CommonStyles } from '../../styles';

const styles = (theme: Theme) => ({
    headerControls: Object.assign(
        {},
        CommonStyles.dislayInlineFlex,
        CommonStyles.flexAlignCenter
    ),
    checked: {
        color: theme.palette.grey[300]
    },
    group: {
        height: 24,
        width: 24
    },
    headerButton: CommonStyles.marginRight(15)
});

const decorate = withStyles(styles);

export interface VisibilityProps {
    filter?: any;
}

export const VisibilitySelector = decorate<VisibilityProps>(
    class extends React.Component<
        VisibilityProps &
            WithStyles<'headerControls' | 'checked' | 'group' | 'headerButton'>
    > {
        state = {
            selectedValue: VisibilityFilter.ALL
        };

        handleChange = (event: React.ChangeEvent<any>): void => {
            this.setState({ selectedValue: event.target.value });
        };
        render() {
            const { classes } = this.props;
            return (
                <div className={classes.headerControls}>
                    <RadioGroup
                        aria-label="Filter"
                        name="filter"
                        style={{ flexDirection: 'row' }}
                        value={this.state.selectedValue}
                        onChange={this.handleChange}
                    >
                        {Object.keys(VisibilityFilter).map(filter => (
                            <FormControlLabel
                                key={filter}
                                value={filter}
                                control={
                                    <Radio
                                        classes={{
                                            root: classes.group,
                                            checked: classes.checked
                                        }}
                                    />
                                }
                                label={filter}
                            />
                        ))}
                    </RadioGroup>
                    <Button className={classes.headerButton}>Reset</Button>
                </div>
            );
        }
    }
);
