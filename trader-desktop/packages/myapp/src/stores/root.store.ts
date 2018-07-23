import { RouterState, RouterStore } from 'mobx-state-router';
import { routes } from './routes';
import { OrderStore, HttpOrderAdapter, HttpServerAdapter } from 'shared';

const notFound = new RouterState('notFound');

export class RootStore {
    
    public routerStore: RouterStore;
    public orderStore: OrderStore;
    public adapters: any;

    // ----- Lifecycle hooks -----
    // Useful for starting and stopping observers, autoruns and reactions

    constructor() {
        this.adapters = {
            orderAdapter: new HttpOrderAdapter(),
            serverAdapter: new HttpServerAdapter()
        };

        this.routerStore = new RouterStore(this, routes, notFound);
        this.orderStore = new OrderStore(this.adapters);
    }

    destroy() { }
}
