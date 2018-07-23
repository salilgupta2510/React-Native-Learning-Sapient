import axios from 'axios';
import { JsOrder } from '../domain/order';
import { REACT_APP_API } from '../constants';

export interface OrderAdapter {
    createOrder(jsOrder: JsOrder): Promise<any>;
    fetchOrders(): Promise<JsOrder[]>;
}

export class HttpOrderAdapter implements OrderAdapter {
    createOrders(jsOrders: JsOrder[]): Promise<any> {
        return axios.post(REACT_APP_API + '/orders/bulk', jsOrders);
    }

    createOrder(jsOrder: JsOrder): Promise<any> {
        return axios.post(REACT_APP_API + '/orders', jsOrder);
    }

    fetchOrders(): Promise<JsOrder[]> {
        return axios.get(REACT_APP_API + '/orders').then(response => {
            return response.data;
        });
    }
}