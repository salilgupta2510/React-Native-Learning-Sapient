import { Placement } from './placement';
import { Side } from './types';

export interface OrderStatus {
    committed: number;
    done: number;
    notDone: number;
    uncommitted: number;
    pctDone: number;
    pctNotDone: number;
    pctUncommitted: number;
}

/**
 * An order to buy or sell a security for a specific fund.
 */
export class Order {
    placementMap: Map<string, Placement> = new Map();

    constructor(
        readonly id: string,
        public side: Side,
        public symbol: string,
        public quantity: number
    ) { }

    place(placement: Placement) {
        this.placementMap.set(placement.id, placement);
    }

    get status(): OrderStatus {
        // TODO: Convert placementMap into an array
        let placementArr = Array.from(this.placementMap.values());
        // Use the array reduce function to compute OrderStatus
        return placementArr.reduce((result, currentVal): OrderStatus => {

            if (this.id === currentVal.orderId) {
                result.committed += currentVal.quantity;
            }

            result.done = currentVal.done;
            result.notDone = result.committed - result.done;
            result.uncommitted = this.quantity - result.committed;
            result.pctDone = result.done / this.quantity;
            result.pctNotDone = result.notDone / this.quantity;
            result.pctUncommitted = result.uncommitted / this.quantity;

            return result;
        }, {
                committed: 0,
                done: 0,
                notDone: 0,
                uncommitted: 0,
                pctDone: 0,
                pctNotDone: 0,
                pctUncommitted: 0
            }
        );
    }
}
