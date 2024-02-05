import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { MenuButtonActionEnum } from '../enums/menu-buttons.enum.ts.js';
import { ViewEnum } from '../enums/view.enum.js';
import { GameStatusEnum } from '../enums/game-status.enum.js';
import { IGameRanking } from '../interfaces/game-ranking.interface.js';
import { fromEvent } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { IGameplayHistory } from '../interfaces/gameplay-history.interface.js';

@Injectable({
  providedIn: 'root',
})
export class SnakeService {
  public menuAction: WritableSignal<MenuButtonActionEnum> = signal(
    MenuButtonActionEnum.SHOW_MENU
  );
  public snakeView: WritableSignal<ViewEnum> = signal(ViewEnum.MENU);
  public gameStatus: WritableSignal<GameStatusEnum> = signal(
    GameStatusEnum.INIT
  );
  public gameScore: WritableSignal<number> = signal(0);
  public playerName: string = '';
  public playerEmail: string = '';

  public playersRanking: WritableSignal<IGameRanking[]> = signal([]);
  public gameplayHistory: WritableSignal<IGameplayHistory[]> = signal([]);
  constructor() {}

  public noticeScoreInStorage(): void {
    const data = {
      index: this.playersRanking().length,
      playerName: this.playerName,
      playerEmail: this.playerEmail,
      score: this.gameScore(),
      endGameTime: new Date(),
    };
    this.playersRanking.update((prev) => [...prev, data]);
    window.localStorage.setItem(
      'playersRanking',
      JSON.stringify(this.playersRanking())
    );
  }
  public noticePlayerActionInStorage(): void {
    const data = {
      index: this.gameplayHistory().length,
      action: this.gameStatus(),
      date: new Date(),
    };
    this.gameplayHistory.update((prev) => [...prev, data]);
  }
}
