import { action, computed, decorate, observable, ObservableMap } from 'mobx';
import { VisibilityFilterEnum } from '../../../myapp/src/constants';
import { JsOrder, Order } from '../domain/order';

export class OrderStore {
    orderMap: Map<string, JsOrder[]> = new Map();
    filter: string = VisibilityFilterEnum.ALL;
    numOrdersToCreate: number = 10;

    get numOrders() {
        return this.orderMap.size;
    }

    constructor(public rootStore: any) {}

    initialize = (jsOrders: JsOrder[]) => {
        jsOrders.forEach(order => {
            this.orderMap.set(order.id, jsOrders);
        });
    };

    createOrder = (jsOrder: JsOrder) => {};

    updateOrder = (jsOrder: JsOrder) => {
        // const order = new Order(jsOrder);
        // Order.update(jsOrder);
    };
}

decorate(OrderStore, {
    orderMap: observable,
    filter: observable,
    numOrdersToCreate: observable,
    numOrders: computed,
    initialize: action,
    createOrder: action,
    updateOrder: action
});
