import { TreasureMap } from './treasure-map';
import { Player } from './player';
import { Mountain } from './mountain';
import { Treasure } from './treasure';

describe('TreasureMap', () => {

	let treasureMap: TreasureMap;

	beforeEach(() => {
		treasureMap = new TreasureMap(5, 6);
	})

	describe('Map composition', () => {
		it('Impossible adding player', async () => {
			const player1: Player = new Player('Alphonse', 3, 3, 'South', [], treasureMap);
			const player2: Player = new Player('Germaine', 3, 3, 'South', [], treasureMap);
			treasureMap.addPlayer(player1);

			expect(() => treasureMap.addPlayer(player2)).toThrowError('This place is already taken');
		});

		it('Impossible adding mountain', async () => {
			const mountain1: Mountain = new Mountain(2, 3);
			const mountain2: Mountain = new Mountain(2, 3);
			treasureMap.addMountain(mountain1);

			expect(() => treasureMap.addMountain(mountain2)).toThrowError('This place is already taken');
		});

		it('Merge adding treasure', async () => {
			const treasure1: Treasure = new Treasure(2, 3, 1);
			const treasure2: Treasure = new Treasure(2, 3, 2);
			treasureMap.addTreasure(treasure1);
			treasureMap.addTreasure(treasure2);

			expect(treasureMap.treasures.length).toBe(1);
			expect(treasure1.quantity).toBe(3);
		});
	});

	describe('Map game processing', () => {
		it('Map does simple turn', async () => {
			const player1: Player = new Player('Alphonse', 1, 3, 'South', ['A'], treasureMap);
			const player2: Player = new Player('Germaine', 3, 3, 'North', ['A', 'D'], treasureMap);
			treasureMap.addPlayer(player1);
			treasureMap.addPlayer(player2);

			treasureMap['doSingleTurn']();

			expect(player1.row).toBe(4);
			expect(player1.actions.length).toBe(0);
			expect(player2.row).toBe(2);
			expect(player2.actions.length).toBe(1);
		});

		it('Player horizontal concurrency', async () => {
			const player1: Player = new Player('Alphonse', 1, 3, 'East', ['A'], treasureMap);
			const player2: Player = new Player('Germaine', 3, 3, 'West', ['A'], treasureMap);
			treasureMap.addPlayer(player1);
			treasureMap.addPlayer(player2);

			treasureMap['doSingleTurn']();

			expect(player1.column).toBe(2);
			expect(player2.column).toBe(3);
		});

		it('Player vertical concurrency', async () => {
			const player1: Player = new Player('Alphonse', 2, 2, 'South', ['A'], treasureMap);
			const player2: Player = new Player('Germaine', 2, 4, 'North', ['A'], treasureMap);
			treasureMap.addPlayer(player1);
			treasureMap.addPlayer(player2);

			treasureMap['doSingleTurn']();

			expect(player1.row).toBe(3);
			expect(player2.row).toBe(4);
		});
	});
})