import {inject, Injectable, signal, WritableSignal,} from '@angular/core';
import {MenuButtonActionEnum} from '../enums/menu-buttons.enum.ts.js';
import {IGetScoresResponse, IPostScoresRequest} from "../interfaces/api-response.interface";
import {ApiService} from "./api.service";
import {catchError, map, of} from "rxjs";
import {PlayerService} from "./player.service";

@Injectable({
  providedIn: 'root',
})
export class SnakeService {
  public menuAction: WritableSignal<MenuButtonActionEnum> = signal(
    MenuButtonActionEnum.SHOW_MENU
  );
  public topPlayersRanking: WritableSignal<IGetScoresResponse[]> = signal([]);

  private apiService: ApiService = inject(ApiService);
  private playerService: PlayerService = inject(PlayerService);

  public getScores(): void {
    this.apiService.getScores()
      .pipe(
        catchError(() => of()),
        map((data: IGetScoresResponse[]) => data.sort((a: IGetScoresResponse, b: IGetScoresResponse) => {
          return b.score - a.score
        })),
        map((data: IGetScoresResponse[]) => data.map((item: IGetScoresResponse, index: number) => {
          item.index = index + 1;
          return item;
        })),
        map((data: IGetScoresResponse[]) => data.splice(0, 10)),
      )
      .subscribe((res: IGetScoresResponse[]) => {
        this.topPlayersRanking.set(res)
      })
  }

  public postNewScore(): void {
    const payload: IPostScoresRequest = {
      name: this.playerService.name(),
      game: "tetris",
      score: this.playerService.score(),
      authToken: this.playerService.authToken()
    }
    this.apiService.addScore(payload)
      .pipe(
        catchError(() => of()),
        map((data: IGetScoresResponse[]) => data.splice(0, 10))
      )
      .subscribe((res: IGetScoresResponse[]) => {
        this.topPlayersRanking.set(res)
      })
  }


}
