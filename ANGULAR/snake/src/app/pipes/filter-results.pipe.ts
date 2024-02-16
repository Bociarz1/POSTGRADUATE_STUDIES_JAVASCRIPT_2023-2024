import { Pipe, PipeTransform } from '@angular/core';
import { GameStatusEnum } from '../enums/game-status.enum';
import { IGameplayHistory } from '../interfaces/gameplay-history.interface';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterResultsPipe implements PipeTransform {
  transform(
    gameplayHistory: IGameplayHistory[],
    actionType: GameStatusEnum
  ): IGameplayHistory[] {
    if (actionType === GameStatusEnum.UNKNOWN) return gameplayHistory;
    const filteredData: IGameplayHistory[] = gameplayHistory.filter(
      (item: IGameplayHistory) => {
        return item.action === actionType;
      }
    );

    return filteredData;
  }
}
