export abstract class Localizable {

	protected constructor(
		protected _column: number,
		protected _row: number
	) {
	}

	get column(): number {
		return this._column;
	}

	set column(column: number) {
		this._column = column;
	}

	get row(): number {
		return this._row;
	}

	set row(row: number) {
		this._row = row;
	}

	isOnTheSameLocation(element: Localizable) {
		return this.column === element.column && this.row === element.row;
	}

	isAt(row: number, column: number): boolean {
		return this.row === row && this.column === column;
	}

	isBefore(element: Localizable): boolean {
		if (this.row < element.row) {
			return true;
		}

		if (this.row === element.row && this.column < element.column) {
			return true;
		}

		return false;
	}

	abstract toString(): string;
}