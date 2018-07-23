import { action, decorate, observable, ObservableMap } from 'mobx';
import { JsOrder, Order } from '../domain/order';
import { VisibilityFilter } from '../domain/types';

export class OrderStore {
    orderMap: ObservableMap<string, Order>;
    filter: string = VisibilityFilter.ALL;
    numOrdersToCreate: number = 10;

    constructor() {
        this.orderMap = new ObservableMap<string, Order>();
    }

    initialize = (jsOrders: JsOrder[]) => {
        jsOrders.forEach(this.createOrder);
    };

    createOrder = (jsOrder: JsOrder) => {
        const { id, side, symbol, quantity, committed, executed } = jsOrder;
        this.orderMap.set(
            id,
            new Order(id, side, symbol, quantity, committed, executed)
        );
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
        this.orderMap.clear();
    };

    setNumOrdersToCreate = (num: number) => {
        this.numOrdersToCreate = num;
    };

    setFilter = (filter: string) => {
        this.filter = filter;
    };
}

decorate(OrderStore, {
    filter: observable,
    numOrdersToCreate: observable,
    initialize: action,
    createOrder: action,
    updateOrder: action,
    deleteAllOrders: action,
    setNumOrdersToCreate: action,
    setFilter: action
});
