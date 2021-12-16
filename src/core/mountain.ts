import { Localizable } from './localizable';

export class Mountain extends Localizable {

    // If someone has specific code to write in Mountain, then enjoy here

    constructor(
        protected _column: number,
        protected _row: number
    ) {
        super(_column, _row);
    }

    toString(): string {
        return 'M'.padEnd(7, ' ');
    }

    toFile(): string {
        return `M - ${ this.column } - ${ this.row }`;
    }
}