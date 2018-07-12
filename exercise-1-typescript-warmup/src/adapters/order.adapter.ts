import { Order } from '../domain';
import { jsOrders } from '../data/index';
import { Side } from '../domain/types';

export function loadOrders(): Map<string, Order> {
    // TODO: load JS orders from ../../data and convert them to Order objects
    let orders: Map<string, Order> = new Map<string, Order>();
    jsOrders.forEach(order => {
        orders.set(order.id, new Order(order.id, <Side> order.side, order.symbol, order.quantity));
    });
    return orders;
}
