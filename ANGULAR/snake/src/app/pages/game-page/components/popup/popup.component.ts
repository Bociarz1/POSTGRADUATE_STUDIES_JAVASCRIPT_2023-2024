import {ChangeDetectionStrategy, Component, computed, inject, Signal,} from '@angular/core';
import {SnakeService} from '../../../../services/snake.service';
import {GameStatusEnum} from '../../../../enums/game-status.enum';
import {IPopupContent} from '../../../../interfaces/popup.interface';
import {popupContent} from '../../../../consts/popup.consts';
import {PlayerService} from "../../../../services/player.service";

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
    this.popupContent = popupContent[this.playerService.gameStatus()];
    if (this.playerService.gameStatus() === GameStatusEnum.INIT) {
      this.popupContent.headerText =
        this.popupContent.headerText +
        (this.playerService.name() || ' Player');
    }
    return this.playerService.gameStatus() !== GameStatusEnum.STARTED;
  });

  private snakeService: SnakeService = inject(SnakeService);
  private playerService: PlayerService = inject(PlayerService);

  protected handleBtnClick() {
    this.playerService.gameStatus.set(GameStatusEnum.STARTED);
  }
}
