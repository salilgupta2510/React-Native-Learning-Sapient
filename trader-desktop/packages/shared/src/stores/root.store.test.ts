import { OrderStore } from './order.store';
import { MockOrderAdapter } from './test-support/mock-order.adapter';
import { MockServerAdapter } from './test-support/mock-server.adapter';

export class TestRootStore {

    orderStore: OrderStore;
    adapters: any;

    constructor() {
        this.orderStore = new OrderStore(this.adapters);

        this.adapters = {
            orderAdapter: new MockOrderAdapter(),
            serverAdapter: new MockServerAdapter()
        };
    }
}