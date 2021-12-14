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
        this.players.push(player);
        this.players = this.players
            .sort((player1: Localizable, player2: Localizable) => player1.isBefore(player2) ? 1 : -1);
    }

    get mountains(): Mountain[] {
        return this._mountains;
    }

    set mountains(mountains: Mountain[]) {
        this._mountains = mountains;
    }

    addMountain(mountain: Mountain) {
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
            .sort((treasure1: Localizable, treasure2: Localizable) => treasure1.isBefore(treasure2) ? 1 : -1)
    }

    runTheTreasureGame(): void {
        while (!this.isGameFinish()) {
            this.doSingleTurn();
        }
    }

    private isGameFinish(): boolean {
        return this.players
            .map((player: Player) => player.actions.length)
            .reduce((n1: number, n2: number) => n1 + n2, 0) === 0;
    }

    private doSingleTurn(): void {
        this.players.forEach((player: Player) => player.doAction(this._rows, this._columns, [...this.mountains, ...this.players], this.treasures));
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
        return '';
    }
}