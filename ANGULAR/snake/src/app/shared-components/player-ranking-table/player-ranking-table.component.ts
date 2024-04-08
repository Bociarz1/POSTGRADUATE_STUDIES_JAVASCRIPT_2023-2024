import {Component, computed, DestroyRef, inject, OnInit, Signal, signal, WritableSignal,} from '@angular/core';
import {SnakeService} from '../../services/snake.service';
import {CommonModule} from '@angular/common';
import {TopPlayersColumnsEnum} from '../../enums/top-players-columns.enum';
import {IGameRanking} from '../../interfaces/game-ranking.interface';
import {interval} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'player-ranking-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-ranking-table.component.html',
  styleUrl: './player-ranking-table.component.scss',
})
export class PlayerRankingTableComponent implements OnInit {
  protected dataSource: Signal<IGameRanking[]> = computed(() => {
    if (this.sortedDataSource().length > 0) {
      return this.sortedDataSource();
    } else {
      return this.snakeService.topPlayersRanking()
    }
    ;
  });
  protected sortedColumn!: TopPlayersColumnsEnum;
  protected sortedDataSource: WritableSignal<IGameRanking[]> = signal([]);
  protected StatsColumnsEnum = TopPlayersColumnsEnum;

  protected snakeService: SnakeService = inject(SnakeService);
  protected destroyRef: DestroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.snakeService.getScores();
    this.fetchScoresInInterval();
  }

  protected sort(
    column: TopPlayersColumnsEnum,
    type: 'asc' | 'desc' | 'normal'
  ): void {
    if (type === 'normal') return this.sortedDataSource.set([]);

    this.sortedColumn = column;
    const sortedData: IGameRanking[] = [...this.snakeService
      .topPlayersRanking()]
      .sort((a: IGameRanking, b: IGameRanking) => {
        let aValue!: string | number;
        let bValue!: string | number;
        if (
          column === TopPlayersColumnsEnum.NAME) {
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

  private fetchScoresInInterval(): void {
    interval(30000,).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.snakeService.getScores();
    })
  }
}
