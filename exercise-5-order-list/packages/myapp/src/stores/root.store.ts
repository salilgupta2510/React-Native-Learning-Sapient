import { RouterState, RouterStore } from 'mobx-state-router';
import { routes } from './routes';
import { OrderStore } from 'shared';

const notFound = new RouterState('notFound');

export class RootStore {
    
    public routerStore: RouterStore;
    public orderStore: OrderStore;

    // ----- Lifecycle hooks -----
    // Useful for starting and stopping observers, autoruns and reactions

    constructor() {
        this.routerStore = new RouterStore(this, routes, notFound);
        this.orderStore = new OrderStore();
    }

    destroy() { }
}
