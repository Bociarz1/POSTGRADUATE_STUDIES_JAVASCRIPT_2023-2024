import { Pipe, PipeTransform } from '@angular/core';
import { GameStatusEnum } from '../enums/game-status.enum';

@Pipe({
  name: 'status',
  standalone: true,
})
export class StatusPipe implements PipeTransform {
  transform(status: GameStatusEnum): string {
    switch (status) {
      case GameStatusEnum.INIT:
        return 'Game launched';
        break;
      case GameStatusEnum.PAUSED:
        return 'Game paused';
        break;
      case GameStatusEnum.READY:
        return 'Game over';
        break;
      case GameStatusEnum.STARTED:
        return 'Game playing';
        break;
      case GameStatusEnum.UNKNOWN:
        return '';
        break;
    }
  }
}
