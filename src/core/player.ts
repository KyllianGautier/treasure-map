import { Localizable } from './localizable';
import { Treasure } from './treasure';
import { TreasureMap } from './treasure-map';

export type Direction = 'North' | 'East' | 'South' | 'West';

export class Player extends Localizable {

    private _treasureCount: number = 0;

    constructor(
        private readonly _name: string,
        protected _column: number,
        protected _row: number,
        private _direction: Direction,
        private readonly _actions: string[],
        private readonly _treasureMap: TreasureMap
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

    doAction(): void {
        if (this.actions.length > 0) {
            switch (this.actions.shift()) {
                case 'A':
                    this.goForward();
                    break;
                case 'G':
                    this.turnRound('G');
                    break;
                case 'D':
                    this.turnRound('D');
                    break;
            }
        }
        // If no action left, then ignore this game turn
    }

    private goForward(): void {
        const [maxRowIndex, maxColumnIndex] = [this.treasureMap.rows - 1, this.treasureMap.columns - 1];
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
                nextRowIndex = this.row < maxRowIndex ? this.row + 1 : maxRowIndex;
                break;
            case 'West':
                console.debug(this.name + ' wants to go west');
                nextColumnIndex = this.column > 0 ? this.column - 1 : 0;
                break;
        }

        // Check obstacle hitting:
        const obstacles: Localizable[] = this.treasureMap.getObstacles();
        let index: number = obstacles.findIndex((obstacle: Localizable) => obstacle.isAt(nextRowIndex, nextColumnIndex))

        if (index >= 0) {
            console.debug(this.name + ' hits an obstacle');
            return;
        }

        // If no obstacle has been hit, then update the player's position:
        this.row = nextRowIndex;
        this.column = nextColumnIndex;

        // Check treasure founding:
        const treasures: Treasure[] = this.treasureMap.treasures;
        index = treasures.findIndex((obstacle: Localizable) => obstacle.isAt(nextRowIndex, nextColumnIndex))

        if (index >= 0) {
            console.debug(this.name + ' has found a treasure !');
            treasures[index].decreaseQuantity() ? this.increaseTreasureCount() : console.debug('... but it\'s empty :(');
        }
    }

    private turnRound(direction: 'G' | 'D'): void {
        const directions: Direction[] = ['North', 'East', 'South', 'West'];

        let newDirectionIndex: number = directions.findIndex((direction: Direction) => direction === this.direction) + (direction === 'G' ? -1 : 1);
        // Make sure that direction is included between [0, 3]:
        newDirectionIndex = (newDirectionIndex + directions.length) % directions.length;

        this.direction = directions[newDirectionIndex];
    }

    get treasureMap(): TreasureMap {
        return this._treasureMap;
    }

    toString(): string {
        return 'A ' + `(${ this.treasureCount.toString() })`.padEnd(5, ' ');
    }

    toFile(): string {
        return `A - ${ this.name } - ${ this.column } - ${ this.row } - ${ this.treasureCount }`;
    }
}