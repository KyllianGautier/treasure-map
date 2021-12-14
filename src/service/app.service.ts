import { Injectable } from '@nestjs/common';
import { TreasureMap } from '../model/treasure-map';
import {
  fileToDescriptions,
  mountainMapper,
  playerMapper,
  treasureMapMapper, treasureMapper
} from '../utils/mapper-functions';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  getResultMap(fileContent: string): void {
    const treasureMap: TreasureMap = this.getTreasureMap(fileContent);
    console.debug(treasureMap.toString());
    treasureMap.runTheTreasureGame();
  }

  private getTreasureMap(fileContent: string): TreasureMap {

    const descriptions: string[] = fileToDescriptions(fileContent);
    const treasureMap: TreasureMap = treasureMapMapper(descriptions.shift());

      descriptions.forEach((description: string) => {
        if (description[0] === 'A') {
          treasureMap.addPlayer(playerMapper(description));
        } else if (description[0] === 'M') {
          treasureMap.addMountain(mountainMapper(description));
        } else if (description[0] === 'T') {
          treasureMap.addTreasure(treasureMapper(description));
        }
      });

      return treasureMap;
  }
}
