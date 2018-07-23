import * as React from 'react';
import { Theme, withStyles } from '@material-ui/core/styles';
import { VisibilityFilterEnum } from '../../constants';
import { CommonStyles } from '../../styles';
import { Header, OrderList } from 'shared';

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
                <Header selectedFilter={VisibilityFilterEnum.ALL}>
                    TRADER DESKTOP
                </Header>
                <OrderList />
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
