import {Component, computed, inject, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {IGameRanking} from "../../interfaces/game-ranking.interface";
import {DatePipe, NgTemplateOutlet} from "@angular/common";
import {PlayerScoresColumnsEnum} from "../../enums/player-scores-columns.enum";
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'player-scores-table',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    DatePipe
  ],
  templateUrl: './player-scores-table.component.html',
  styleUrl: './player-scores-table.component.scss'
})
export class PlayerScoresTableComponent implements OnInit {
  protected dataSource: Signal<IGameRanking[]> = computed(() => {
    if (this.sortedDataSource().length > 0) {
      return this.sortedDataSource();
    } else return this.playerService.playerScores();
  });
  protected sortedColumn!: PlayerScoresColumnsEnum;
  protected sortedDataSource: WritableSignal<IGameRanking[]> = signal([]);
  protected StatsColumnsEnum = PlayerScoresColumnsEnum;

  private playerService: PlayerService = inject(PlayerService)

  public ngOnInit(): void {
    this.localStorageListener();
  }

  protected sort(
    column: PlayerScoresColumnsEnum,
    type: 'asc' | 'desc' | 'normal'
  ): void {
    if (type === 'normal') return this.sortedDataSource.set([]);

    this.sortedColumn = column;
    const sortedData: IGameRanking[] = [...this.playerService.playerScores()]
      .sort((a: IGameRanking, b: IGameRanking) => {
        let aValue!: string | number;
        let bValue!: string | number;
        if (
          column === PlayerScoresColumnsEnum.NAME || PlayerScoresColumnsEnum.TIME_PLAYING) {
          aValue = a[column]?.toString() as string;
          bValue = b[column]?.toString() as string;
        } else {
          aValue = Number(a[column]) as number;
          bValue = Number(b[column]) as number;
        }
        if (aValue === bValue) return 0;
        return (type === 'asc' ? aValue < bValue : bValue < aValue) ? -1 : 1;
      });
    this.sortedDataSource.set(sortedData);
  }

  private localStorageListener(): void {
    let storage = localStorage.getItem('playerScores');
    if (storage === null) return;
    storage = JSON.parse(storage ?? '');
    if (typeof storage !== 'string' && storage !== null) {
      this.playerService.playerScores.set(storage);
    }
  }
}
