import { Execution } from './execution';
import { Side } from './types';

/**
 * A buy or sell order placed with a broker.
 */
export class Placement {
    executionMap: Map<string, Execution> = new Map();

    constructor(
        readonly id: string,
        public side: Side,
        public symbol: string,
        public quantity: number,
        readonly orderId: string
    ) {}

    execute(execution: Execution) {
            this.executionMap.set(execution.id, execution);
    }

    get done(): number {
        // TODO: Convert executionMap into an array
        let executionArr = Array.from(this.executionMap.values());
        // Use the array reduce function to compute done
        return executionArr.reduce((result, currentValue): number => {
            if (this.id === currentValue.placementId) {
                result += currentValue.quantity;
            }
            return result;
        }, 0)
    }
}
