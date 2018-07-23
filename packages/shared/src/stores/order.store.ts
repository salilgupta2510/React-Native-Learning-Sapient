import { action, decorate, ObservableMap, observable, computed } from 'mobx';
import { JsOrder, Order } from '../domain/order';
import { generateOrder } from '../utils/generate-order';
import { HttpOrderAdapter } from '../adapters/order.adapter';
import { VisibilityFilterEnum } from '../constants';

export class OrderStore {
    private orderMap: ObservableMap<string, Order>;
    public filter: VisibilityFilterEnum;
    public numOrdersToCreate: number;

    constructor(private adapters: any) {
        this.orderMap = new ObservableMap<string, Order>();
        this.filter = VisibilityFilterEnum.ALL;
        this.numOrdersToCreate = 0;
    }

    get count(): number {
        return this.orderMap.size;
    }

    initialize = (jsOrders: JsOrder[]) => {
        jsOrders.forEach(order => {
            const { id, side, symbol, quantity, committed, executed } = order;
            this.orderMap.set(
                id,
                new Order(id, side, symbol, quantity, committed, executed)
            );
        });
    };

    createOrder = (jsOrder: JsOrder): Promise<any> => {
        const { id, side, symbol, quantity, committed, executed } = jsOrder;
        const { orderAdapter } = this.adapters;

        // Creates one order
        return (<HttpOrderAdapter>orderAdapter)
            .createOrder(jsOrder)
            .then(respone => {
                this.orderMap.set(
                    id,
                    new Order(id, side, symbol, quantity, committed, executed)
                );
                return respone;
            });
    };

    updateOrder = (jsOrder: JsOrder) => {
        const { id } = jsOrder;
        let order = this.orderMap.get(id);

        if (order) {
            order.update(jsOrder);
            this.orderMap.set(id, order);
        } else throw Error(`Order with id ${id} does not exist.`);
    };

    deleteAllOrders = () => {
        if (this.count) {
            return this.adapters.serverAdapter.reset().then(() => {
                this.orderMap.clear();
            });
        } else {
            return Promise.reject('No orders exist');
        }
    };

    createOrdersAtServer = (numOrdersToCreate?: number): Promise<any> => {
        const { orderAdapter } = this.adapters;
        const num = numOrdersToCreate || this.numOrdersToCreate;

        let orders: JsOrder[] = [];

        for (let i = 0; i < num; i++) {
            orders.push(generateOrder());
        }

        // Creates mutliple order - bulk insert
        return (<HttpOrderAdapter>orderAdapter)
            .createOrders(orders)
            .then(response => {
                orders.forEach(order => {
                    const {
                        id,
                        side,
                        symbol,
                        quantity,
                        committed,
                        executed
                    } = order;
                    this.orderMap.set(
                        id,
                        new Order(
                            id,
                            side,
                            symbol,
                            quantity,
                            committed,
                            executed
                        )
                    );
                });

                return response;
            });
    };

    setNumOrdersToCreate = (num: number) => {
        this.numOrdersToCreate = num;
    };

    setFilter = (filter: VisibilityFilterEnum) => {
        this.filter = filter;
    };

    loadOrders = (): Promise<JsOrder[]> => {
        const { orderAdapter } = this.adapters;
        return orderAdapter.fetchOrders().then(this.initialize);
    };

    getVisibleOrders = (filter?: VisibilityFilterEnum): Order[] => {
        const effectiveFilter = filter || this.filter;

        let orders = Array.from(this.orderMap.values());

        switch (effectiveFilter) {
            case VisibilityFilterEnum.DONE:
                return orders.filter(order => order.isExecuted);
            case VisibilityFilterEnum.OPEN:
                return orders.filter(order => order.isPlaced);
            default:
                return orders;
        }
    };
}

decorate(OrderStore, {
    filter: observable,
    numOrdersToCreate: observable,
    count: computed,
    initialize: action,
    createOrder: action,
    updateOrder: action,
    deleteAllOrders: action,
    setNumOrdersToCreate: action,
    setFilter: action,
    loadOrders: action,
    createOrdersAtServer: action
});
