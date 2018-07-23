import { action, computed, decorate, observable } from 'mobx';

export enum Side {
    BUY = 'BUY',
    SELL = 'SELL'
}

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
 * An interface describing a plain JavaScript order.
 * Such an object will be used to receive/send orders to the server.
 */
export interface JsOrder {
    readonly id: string;
    side: Side;
    symbol: string;
    quantity: number;
    committed: number;
    executed: number;
}

/**
 * An order to buy or sell a security for a specific fund.
 */
export class Order {
    constructor(
        readonly id: string,
        public side: Side,
        public symbol: string,
        public quantity: number,
        public committed: number = 0,
        public executed: number = 0
    ) {
        this.serialize = this.serialize.bind(this);
        this.update = this.update.bind(this);
    }

    /**
     * Updates the order from a plain JavaScript object
     */
    update(jsOrder: JsOrder): void {
        Object.assign(this, jsOrder);
    }

    /**
     * Converts the MobX observable to a plain JavaScript object
     */
    serialize(): JsOrder {
        const { id, side, symbol, quantity, committed, executed } = this 
        return { id, side, symbol, quantity, committed, executed };
    }

    /**
     * Returns true when the order is fully placed (i.e. fully committed)
     * @returns {boolean}
     */
    get isPlaced(): boolean {
        return this.executed < this.quantity;
    }

    /**
     * Returns true when the order is fully executed (a.k.a. done)
     * @returns {boolean}
     */
    get isExecuted(): boolean {
        return this.executed == this.quantity;
    }

    get status(): OrderStatus {
        return {
            committed: this.committed,
            done: this.executed,
            notDone: this.quantity - this.executed,
            uncommitted: this.quantity - this.committed,
            pctDone: this.executed / this.quantity * 100,
            pctNotDone: (this.quantity - this.executed) / this.quantity * 100,
            pctUncommitted: (this.quantity - this.committed) / this.quantity * 100,
        }
    }
}

decorate(Order, {
    id: observable,
    side: observable,
    symbol: observable,
    quantity: observable,
    committed: observable,
    executed: observable,
    isPlaced: computed,
    isExecuted: computed,
    status: computed,
    update: action
});