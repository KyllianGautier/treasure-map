import { Player } from './player';
import { Mountain } from './mountain';
import { Treasure } from './treasure';
import { Localizable } from './localizable';

export class TreasureMap {

    private _players: Player[] = [];
    private _mountains: Mountain[] = [];
    private _treasures: Treasure[] = [];

    constructor(
        private readonly _columns: number,
        private readonly _rows: number
    ) {}

    get columns(): number {
        return this._columns;
    }

    get rows(): number {
        return this._rows;
    }

    get players(): Player[] {
        return this._players;
    }

    set players(players: Player[]) {
        this._players = players
    }

    addPlayer(player: Player) {
        if (!this.isLocationEmpty(player.row, player.column)) {
            throw new Error('This place is already taken');
        }
        this.players.push(player);
        this.players = this.players
            .sort((player1: Localizable, player2: Localizable) => player1.isBefore(player2) ? -1 : 1);
    }

    get mountains(): Mountain[] {
        return this._mountains;
    }

    set mountains(mountains: Mountain[]) {
        this._mountains = mountains;
    }

    addMountain(mountain: Mountain) {
        if (!this.isLocationEmpty(mountain.row, mountain.column)) {
            throw new Error('This place is already taken');
        }
        this.mountains.push(mountain);
    }

    get treasures(): Treasure[] {
        return this._treasures;
    }

    set treasures(treasures: Treasure[]) {
        this._treasures = treasures;
    }

    addTreasure(treasure: Treasure) {
        this.treasures.push(treasure);
        this.treasures = this.treasures
            .reduce((accu: Treasure[], treasure: Treasure) => {
                const index: number = accu.findIndex((element: Treasure) => element.isOnTheSameLocation(treasure))
                if (index < 0) {
                    accu.push(treasure);
                } else {
                    accu[index].mergeTreasure(treasure);
                }
                return accu;
            }, [])
            .sort((treasure1: Localizable, treasure2: Localizable) => treasure1.isBefore(treasure2) ? -1 : 1)
    }

    getObstacles(): Localizable[] {
        return [...this.mountains, ...this.players];
    }

    runTheTreasureGame(): void {
        while (!this.isGameFinish()) {
            this.doSingleTurn();
        }
    }

    private isLocationEmpty(row: number, column: number): boolean {
        return ![...this.players, ...this.mountains, ...this.treasures].some((element: Localizable) => element.isAt(row, column));
    }

    private isGameFinish(): boolean {
        return this.players
            .map((player: Player) => player.actions.length)
            .reduce((n1: number, n2: number) => n1 + n2, 0) === 0;
    }

    private doSingleTurn(): void {
        this.players.forEach((player: Player) => player.doAction());
        this.players = this.players
            .sort((player1: Localizable, player2: Localizable) => player1.isBefore(player2) ? 1 : -1);
        console.debug(this.toString());
    }

    toString(): string {
        const elements: Localizable[] = [...this.players, ...this.mountains, ...this.treasures];

        return Array.from({ length: this.rows }, (_, i: number) => i)
            .map((rowIndex: number) => {
                return Array.from({ length: this.columns }, (_, i: number) => i)
                    .map((columnIndex: number) => {
                        const index: number = elements.findIndex((element: Localizable) => element.isAt(rowIndex, columnIndex));
                        if (index < 0) {
                            return '.      ';
                        }
                        return elements[index].toString();
                    })
                    .join(' ');
            })
            .join(('\n'));
    }

    toFile(): string {
        return [
            `C - ${ this.columns } - ${ this.rows }`,
            this.mountains.map((mountain: Mountain) => mountain.toFile()).join('\n'),
            this.treasures.map((treasure: Treasure) => treasure.toFile()).join('\n'),
            this.players.map((player: Player) => player.toFile()).join('\n')
        ].join('\n');
    }
}