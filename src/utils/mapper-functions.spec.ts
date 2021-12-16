import { mountainMapper, playerMapper, treasureMapMapper, treasureMapper } from './mapper-functions';
import { Player } from '../core/player';
import { TreasureMap } from '../core/treasure-map';
import { Mountain } from '../core/mountain';
import { Treasure } from '../core/treasure';

describe('Mapper functions', () => {

	it('treasureMapMapper', () => {
		const treasureMap: TreasureMap = treasureMapMapper('C-5-6');

		expect(treasureMap.columns).toBe(5);
		expect(treasureMap.rows).toBe(6);
	});

	it('playerMapper', async () => {
		const treasureMap: TreasureMap = new TreasureMap(5, 6);
		const player: Player = playerMapper('A-Alphonse-2-3-S-AGADDA', treasureMap);

		expect(player.name).toBe('Alphonse');
		expect(player.column).toBe(2);
		expect(player.row).toBe(3);
		expect(player.direction).toBe('South');
		expect(player.actions.length).toBe(6);
	});

	it('mountainMapper', async () => {
		const mountain: Mountain = mountainMapper('M-2-3');

		expect(mountain.column).toBe(2);
		expect(mountain.row).toBe(3);
	});

	it('treasureMapper', async () => {
		const treasure: Treasure = treasureMapper('T-2-3-4');

		expect(treasure.column).toBe(2);
		expect(treasure.row).toBe(3);
		expect(treasure.quantity).toBe(4);
	});
});