import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
} from '@angular/core';
import { SnakeService } from '../../../../services/snake.service';
import { SnakeGridComponent } from '../../components/snake-grid/snake-grid.component';
import { PopupComponent } from '../../components/popup/popup.component';
import { ViewEnum } from '../../../../enums/view.enum';
import { PlayerRankingTableComponent } from '../../../../shared-components/player-ranking-table/player-ranking-table.component';
import { GameplayHistoryTableComponent } from '../../../../shared-components/gameplay-history-table/gameplay-history-table.component';
import { CommonModule } from '@angular/common';
import { interval, map, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { StatusPipe } from '../../../../pipes/status.pipe';

@Component({
  selector: 'snake-view-game',
  standalone: true,
  templateUrl: './view-game.component.html',
  styleUrl: './view-game.component.scss',
  imports: [
    SnakeGridComponent,
    PlayerRankingTableComponent,
    GameplayHistoryTableComponent,
    CommonModule,
    StatusPipe,
  ],
})
export class ViewGameComponent {
  constructor(protected snakeService: SnakeService) {}
  protected playingTime: Signal<number | undefined> = toSignal(
    interval(1000).pipe(
      map((seconds) => {
        return new Date(0).setUTCSeconds(seconds);
      })
    )
  );

  protected goToMenu(): void {
    this.snakeService.snakeView.set(ViewEnum.MENU);
  }
}
