import * as React from 'react';
import { Header } from 'shared';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { Theme } from '@material-ui/core/styles';
import { CommonStyles } from '../../styles';
import { VisibilityFilterEnum } from '../../constants';

const styles = (theme: Theme) => ({
    headerControls: Object.assign(
        { height: 36 },
        CommonStyles.dislayInlineFlex
    ),
    headerButton: CommonStyles.marginRight(15),
    chip: {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.common.white
    }
});

class HomePage extends React.Component<any, any> {
    public state: any = {
        visibilityFilter: VisibilityFilterEnum.ALL
    };

    constructor(props: any) {
        super(props);

        this.onVisibilityChange = this.onVisibilityChange.bind(this);
    }

    private onVisibilityChange(event: React.ChangeEvent<any>): void {
        this.setState({
            visibilityFilter: event.target.value
        });
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
                <Header
                    controls={
                        <div className={classes.headerControls}>
                            <RadioGroup
                                aria-label="Filter"
                                name="filter"
                                style={{ flexDirection: 'row' }}
                                value={this.state.visibilityFilter}
                                onChange={this.onVisibilityChange}
                            >
                                {Object.keys(VisibilityFilterEnum).map(
                                    filter => (
                                        <FormControlLabel
                                            key={filter}
                                            value={filter}
                                            control={<Radio />}
                                            label={filter}
                                        />
                                    )
                                )}
                            </RadioGroup>
                            <Button className={classes.headerButton}>
                                RESET
                            </Button>
                            <Button
                                className={classes.headerButton}
                                variant="contained"
                                color="primary"
                            >
                                NEW ORDERS
                            </Button>
                            <Chip label="24" className={classes.chip} />
                        </div>
                    }
                >
                    TRADER DESKTOP
                </Header>
            </div>
        );
    }
}

export default withStyles(styles)(HomePage);
