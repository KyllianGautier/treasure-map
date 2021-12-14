import { Direction, Player } from '../model/player';
import { TreasureMap } from '../model/treasure-map';
import { Mountain } from '../model/mountain';
import { Treasure } from '../model/treasure';

export function fileToDescriptions(fileContent: string): string[] {
	return fileContent.split('\n').map((description: string) => cleanDescription(description));
}

// Player pattern:
// {A comme Aventurier} - {Nom de l’aventurier} - {Axe horizontal} - {Axe vertical} - {Orientation} - {Séquence de mouvement}
export function playerMapper(playerDescription: string): Player {
	const descriptionParts: string[] = descriptionToParts(playerDescription);

	const directions: { [key: string]: Direction } = {};
	directions['N'] = 'North';
	directions['E'] = 'East';
	directions['S'] = 'South';
	directions['O'] = 'West';

	return new Player(
		descriptionParts[1], // name
		+descriptionParts[2], // column
		+descriptionParts[3], // row
		directions[descriptionParts[4]], // direction
		descriptionParts[5].split('') // actions
	)
}

// Map pattern:
// {C comme Carte} - {Nb. de case en largeur} - {Nb. de case en hauteur}
export function treasureMapMapper(mapDescription: string): any {
	const descriptionParts: string[] = descriptionToParts(mapDescription);

	return new TreasureMap(
		+descriptionParts[1], // columns
		+descriptionParts[2], // rows
	)
}

// Mountain pattern:
// {M comme Montagne} - {Axe horizontal} - {Axe vertical}
export function mountainMapper(mountainDescription: string): Mountain {
	const descriptionParts: string[] = descriptionToParts(mountainDescription);

	return new Mountain(
		+descriptionParts[1],
		+descriptionParts[2]
	)
}

// Treasure pattern:
// {T comme Trésor} - {Axe horizontal} - {Axe vertical} - {Nb. de trésors}
export function treasureMapper(treasureDescription: string): Treasure {
	const descriptionParts: string[] = descriptionToParts(treasureDescription);

	return new Treasure(
		+descriptionParts[1],
		+descriptionParts[2],
		+descriptionParts[3] || 1
	);
}

function cleanDescription(str: string): string {
	return str.toUpperCase().split(' ').join('');
}

function descriptionToParts(str: string): string[] {
	return str.split('-');
}