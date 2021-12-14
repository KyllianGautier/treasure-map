import { Localizable } from './localizable';
import { Treasure } from './treasure';

export type Direction = 'North' | 'East' | 'South' | 'West';

export class Player extends Localizable {

    private _treasureCount: number = 0;

    constructor(
        private readonly _name: string,
        protected _column: number,
        protected _row: number,
        private _direction: Direction,
        private readonly _actions: string[]
    ) {
        super(_column, _row);
    }

    get name(): string {
        return this._name;
    }

    get direction(): Direction {
        return this._direction
    }

    set direction(direction: Direction) {
        this._direction = direction;
    }

    get treasureCount(): number {
        return this._treasureCount;
    }

    set treasureCount(treasureCount: number) {
        this._treasureCount = treasureCount;
    }

    increaseTreasureCount(): void {
        this._treasureCount++;
    }

    get actions(): string[] {
        return this._actions;
    }

    doAction(mapRows: number, mapColumns: number, obstacles: Localizable[], treasures: Treasure[]): void {
        switch (this.actions.shift()) {
            case 'A':
                this.goForward(mapRows, mapColumns, obstacles, treasures);
                break;
            case 'G':
                this.turnRound('G');
                break;
            case 'D':
                this.turnRound('D');
                break;
        }
    }

    private goForward(mapRows: number, mapColumns: number, obstacles: Localizable[], treasures: Treasure[]): void {
        const [maxRowIndex, maxColumnIndex] = [mapRows - 1, mapColumns - 1];
        let [nextRowIndex, nextColumnIndex] = [this.row, this.column];

        switch (this.direction) {
            case 'North':
                console.debug(this.name + ' wants to go north');
                nextRowIndex = this.row > 0 ? this.row - 1 : 0;
                break;
            case 'East':
                console.debug(this.name + ' wants to go east');
                nextColumnIndex = this.column < maxColumnIndex ? this.column + 1 : maxColumnIndex;
                break;
            case 'South':
                console.debug(this.name + ' wants to go south');
                nextRowIndex = this.row < maxRowIndex ? this.row + 1 : maxColumnIndex;
                break;
            case 'West':
                console.debug(this.name + ' wants to go west');
                nextColumnIndex = this.column > 0 ? this.column - 1 : 0;
                break;
        }

        // Check obstacles:
        let index: number = obstacles.findIndex((obstacle: Localizable) => obstacle.isAt(nextRowIndex, nextColumnIndex))

        if (index >= 0) {
            console.debug(this.name + ' hits an obstacle', obstacles[index], this.row, this.column);
            return;
        }

        this.row = nextRowIndex;
        this.column = nextColumnIndex;

        // Check treasures:
        index = treasures.findIndex((obstacle: Localizable) => obstacle.isAt(nextRowIndex, nextColumnIndex))

        if (index >= 0) {
            treasures[index].decreaseQuantity() ? this.increaseTreasureCount() : {};
        }
    }

    private turnRound(direction: 'G' | 'D'): void {
        const directions: Direction[] = ['North', 'East', 'South', 'West'];

        let newDirectionIndex: number = directions.findIndex((direction: Direction) => direction === this.direction) + (direction === 'G' ? -1 : 1);
        // Make sure that direction is included between [0, 3]:
        newDirectionIndex = (newDirectionIndex + directions.length) % directions.length;

        this.direction = directions[newDirectionIndex];
    }

    toString(): string {
        return 'A ' + `(${ this.treasureCount.toString() })`.padEnd(5, ' ');
    }
}