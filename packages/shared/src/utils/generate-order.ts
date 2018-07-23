import { v4 } from 'uuid';
import { JsOrder, Side } from '../domain/order';
import { OrderSymbols } from '../constants';

export const generateOrder = (): JsOrder => {
    return {
        id: v4(),
        side: <Side>(
            Object.keys(Side)[
                Math.floor(Math.random() * Object.keys(Side).length)
            ]
        ),
        symbol: OrderSymbols[Math.floor(Math.random() * OrderSymbols.length)],
        quantity: Math.floor(100000 + Math.random() * 900000),
        committed: Math.floor(10000 + Math.random() * 90000),
        executed: Math.floor(1000 + Math.random() * 9000)
    };
};
