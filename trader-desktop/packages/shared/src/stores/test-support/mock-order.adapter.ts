import { JsOrder } from '../../domain/order';
import { generateOrder } from '../../utils/generate-order';

export class MockOrderAdapter {
    createOrder(jsOrder: JsOrder): Promise<any> {
        return Promise.resolve({ statusCode: 201 })
    }

    fetchOrders(): Promise<JsOrder[]> {
        const response: JsOrder[] = [
            generateOrder(),
            generateOrder(),
            generateOrder()
        ];

        return Promise.resolve(response);
    }
}