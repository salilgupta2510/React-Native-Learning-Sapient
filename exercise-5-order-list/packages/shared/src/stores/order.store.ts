import { action, decorate, ObservableMap } from 'mobx';
import { JsOrder, Order } from '../domain/order';

export class OrderStore {
    private orderMap: ObservableMap<string, Order>;
    // private filter: string;
    // private numOrdersToCreate: number;

    constructor() {
        this.orderMap = new ObservableMap<string, Order>();
    }

    initialize = (jsOrders: JsOrder[]) => {
        jsOrders.forEach(this.createOrder);
    };

    createOrder = (jsOrder: JsOrder) => {
        const { id, side, symbol, quantity, committed, executed } = jsOrder;
        this.orderMap.set(id, new Order(id, side, symbol, quantity, committed, executed));
    };

    updateOrder = (jsOrder: JsOrder) => {
        const { id } = jsOrder;
        let order = this.orderMap.get(id);

        if(order) {
            order.update(jsOrder);
            this.orderMap.set(id, order);
        } else
            throw Error(`Order with id ${id} does not exist.`);
    };

    deleteAllOrders = () => {
        this.orderMap.clear();
    }

    setNumOrdersToCreate = (num: number) => {
        
    }

    setFilter = (filter: string) => {

    }

    getVisibleOrders = (filter: string) => {
        
    }
}

decorate(OrderStore, {
    initialize: action,
    createOrder: action,
    updateOrder: action,
    deleteAllOrders: action,
    setNumOrdersToCreate: action,
    setFilter: action
});