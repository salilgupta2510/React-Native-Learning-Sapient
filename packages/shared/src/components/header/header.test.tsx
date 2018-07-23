import * as React from 'react';
import { Provider } from 'mobx-react';
import { mount } from 'enzyme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { getTestTheme } from '../test-support/get-test-theme';
import { Header } from './header';
import { TestRootStore } from '../../stores/root.store.test';

export enum VisibilityFilterEnum {
    ALL = 'ALL',
    OPEN = 'OPEN',
    DONE = 'DONE'
}

test('Header renders specified title', () => {
    const rootStore = new TestRootStore();

    const wrapper = mount(
        <MuiThemeProvider theme={getTestTheme()}>
            <Provider rootStore={rootStore}>
                <Header
                    filters={VisibilityFilterEnum}
                    selectedFilter={VisibilityFilterEnum.ALL}
                >
                    React Template
                </Header>
            </Provider>
        </MuiThemeProvider>
    );
    expect(wrapper.find('h2').text()).toEqual('React Template');
});
