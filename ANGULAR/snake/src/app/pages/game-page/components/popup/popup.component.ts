import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { SnakeService } from '../../../../services/snake.service';
import { GameStatusEnum } from '../../../../enums/game-status.enum';
import { IPopupContent } from '../../../../interfaces/popup.interface';
import { popupContent } from '../../../../consts/popup.consts';

@Component({
  selector: 'snake-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent {
  protected popupContent!: IPopupContent;
  protected visible: Signal<boolean> = computed(() => {
    this.popupContent = popupContent[this.snakeService.gameStatus()];
    if (this.snakeService.gameStatus() === GameStatusEnum.INIT) {
      this.popupContent.headerText =
        this.popupContent.headerText +
        (this.snakeService.playerName || ' Player');
    }
    return this.snakeService.gameStatus() !== GameStatusEnum.STARTED;
  });
  constructor(private snakeService: SnakeService) {}
  protected handleBtnClick() {
    this.snakeService.gameStatus.set(GameStatusEnum.STARTED);
  }
}
