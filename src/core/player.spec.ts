import { TreasureMap } from './treasure-map';
import { Player } from './player';
import { Mountain } from './mountain';
import { Treasure } from './treasure';


describe('Player', () => {

	let treasureMap: TreasureMap;

	beforeEach(() => {
		treasureMap = new TreasureMap(5, 6);
	});

	describe('Player orientation', () => {
		it('Change direction right', async () => {
			const player = new Player('Alphonse', 2, 3, 'South', [], treasureMap);
			treasureMap.addPlayer(player);

			player['turnRound']('D');
			expect(player.direction).toBe('West');
			player['turnRound']('D');
			expect(player.direction).toBe('North');
			player['turnRound']('D');
			expect(player.direction).toBe('East');
			player['turnRound']('D');
			expect(player.direction).toBe('South');
		});

		it('Change direction left', async () => {
			const player = new Player('Alphonse', 2, 3, 'South', [], treasureMap);
			treasureMap.addPlayer(player);

			player['turnRound']('G');
			expect(player.direction).toBe('East');
			player['turnRound']('G');
			expect(player.direction).toBe('North');
			player['turnRound']('G');
			expect(player.direction).toBe('West');
			player['turnRound']('G');
			expect(player.direction).toBe('South');
		});
	});

	describe('Player movement', () => {
		it('Move forward', async () => {
			const player = new Player('Alphonse', 3, 3, 'South', [], treasureMap);
			treasureMap.addPlayer(player);

			player['goForward']();

			expect(player.column).toBe(3);
			expect(player.row).toBe(4);
		});

		it('Move on a wall north', async () => {
			const player = new Player('Alphonse', 3, 0, 'North', [], treasureMap);
			treasureMap.addPlayer(player);

			player['goForward']();

			expect(player.column).toBe(3);
			expect(player.row).toBe(0);
		});

		it('Move on a wall east', async () => {
			const player = new Player('Alphonse', 4, 3, 'East', [], treasureMap);
			treasureMap.addPlayer(player);

			player['goForward']();

			expect(player.column).toBe(4);
			expect(player.row).toBe(3);
		});

		it('Move on a wall south', async () => {
			const player = new Player('Alphonse', 2, 5, 'South', [], treasureMap);
			treasureMap.addPlayer(player);

			player['goForward']();

			expect(player.column).toBe(2);
			expect(player.row).toBe(5);
		});

		it('Move on a wall west', async () => {
			const player = new Player('Alphonse', 0, 3, 'West', [], treasureMap);
			treasureMap.addPlayer(player);

			player['goForward']();

			expect(player.column).toBe(0);
			expect(player.row).toBe(3);
		});

		it('Move on a mountain', async () => {
			const player = new Player('Alphonse', 2, 2, 'South', [], treasureMap);
			const mountain = new Mountain(2, 3);
			treasureMap.addPlayer(player);
			treasureMap.addMountain(mountain);

			player['goForward']();

			expect(player.column).toBe(2);
			expect(player.row).toBe(2);
		});

		it('Move on a player', async () => {
			const player = new Player('Alphonse', 2, 2, 'North', [], treasureMap);
			const opponent = new Player('Germaine', 2, 1, 'South', [], treasureMap);
			treasureMap.addPlayer(player);
			treasureMap.addPlayer(opponent);

			player['goForward']();

			expect(player.column).toBe(2);
			expect(player.row).toBe(2);
		});
	});

	describe('Player gets treasure', () => {
		it('Get simple treasure', async () => {
			const player = new Player('Alphonse', 2, 3, 'South', [], treasureMap);
			const treasure = new Treasure(2, 4, 1);
			treasureMap.addPlayer(player);
			treasureMap.addTreasure(treasure);

			player['goForward']();
			expect(player.treasureCount).toBe(1);
			expect(treasure.quantity).toBe(0);
		});

		it('Get empty treasure', async () => {
			const player = new Player('Alphonse', 2, 3, 'South', [], treasureMap);
			const treasure = new Treasure(2, 4, 0);
			treasureMap.addPlayer(player);
			treasureMap.addTreasure(treasure);

			player['goForward']();
			expect(player.treasureCount).toBe(0);
			expect(treasure.quantity).toBe(0);
		});
	});

	describe('Player action', () => {

		it('Player does an action', async () => {
			const player = new Player('Alphonse', 2, 3, 'South', ['A'], treasureMap);
			treasureMap.addPlayer(player);

			player.doAction();
			expect(player.actions.length).toBe(0);
		});

		it('Player has no more action to do', async () => {
			const player = new Player('Alphonse', 2, 3, 'South', [], treasureMap);
			treasureMap.addPlayer(player);

			player.doAction();
			expect(player.actions.length).toBe(0);
		});
	});
});
