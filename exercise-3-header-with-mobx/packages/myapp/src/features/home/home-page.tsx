import * as React from 'react';
import { CommonStyles } from '../../styles';
import { Header } from 'shared';
import { Theme, withStyles } from '@material-ui/core/styles';
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

    public render() {
        return (
            <div>
                <Header filters={VisibilityFilterEnum} selectedFilter={VisibilityFilterEnum.ALL}>
                    TRADER DESKTOP
                </Header>
            </div>
        );
    }

    private onVisibilityChange(event: React.ChangeEvent<any>): void {
        this.setState({
            visibilityFilter: event.target.value
        });
    }
}

export default withStyles(styles)(HomePage);
