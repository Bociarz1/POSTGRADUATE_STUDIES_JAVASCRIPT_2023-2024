import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {IGameplayHistory} from "../interfaces/gameplay-history.interface";
import {GameStatusEnum} from "../enums/game-status.enum";
import {IGameRanking} from "../interfaces/game-ranking.interface";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  public name: WritableSignal<string> = signal('');
  public score: WritableSignal<number> = signal(0);
  public isPlayerDataExist: Signal<boolean> = computed(() => !!this.name())
  public gameplayHistory: WritableSignal<IGameplayHistory[]> = signal([]);
  public playerScores: WritableSignal<IGameRanking[]> = signal([]);
  public gameStatus: WritableSignal<GameStatusEnum> = signal(
    GameStatusEnum.INIT
  );
  public authToken: WritableSignal<string> = signal('');

  public saveActionInStorage(): void {
    const data = {
      index: this.gameplayHistory().length + 1,
      action: this.gameStatus(),
      date: new Date(),
    };
    this.gameplayHistory.update((prev) => [...prev, data]);
  }

  public saveScoreInStorage(): void {
    const data = {
      index: this.playerScores().length + 1,
      name: this.name(),
      score: this.score(),
      endGameTime: new Date(),
    };
    this.playerScores.update((prev) => [...prev, data]);
    window.localStorage.setItem(
      'playerScores',
      JSON.stringify(this.playerScores())
    );
  }

  public resetUserData(): void {
    this.name.set('');
    this.authToken.set('')
  }
}
