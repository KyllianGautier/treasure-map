import { Localizable } from './localizable';

export class Treasure extends Localizable {

    constructor(
        protected _column: number,
        protected _row: number,
        private _quantity: number
    ) {
        super(_column, _row);
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(quantity: number) {
        this._quantity = quantity;
    }

    decreaseQuantity(): boolean {
        this.quantity = this.quantity - 1;
        if (this.quantity < 0) {
            this.quantity = 0;
            return false;
        }
        return true;
    }

    mergeTreasure(treasure: Treasure) {
        this.quantity += treasure.quantity;
    }

    toString(): string {
        return 'T ' + `(${ this.quantity })`.padEnd(5, ' ');
    }
}