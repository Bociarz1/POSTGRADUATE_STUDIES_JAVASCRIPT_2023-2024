import {
  Component,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { SnakeService } from '../../services/snake.service';
import { CommonModule } from '@angular/common';
import { StatsColumnsEnum } from '../../enums/stats-columns.enum';
import { IGameRanking } from '../../interfaces/game-ranking.interface';

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
    } else return this.snakeService.playersRanking();
  });
  protected sortedColumn!: StatsColumnsEnum;
  protected sortedDataSource: WritableSignal<IGameRanking[]> = signal([]);
  protected StatsColumnsEnum = StatsColumnsEnum;

  constructor(protected snakeService: SnakeService) {}

  public ngOnInit(): void {
    this.localStorageListener();
  }

  protected sort(
    column: StatsColumnsEnum,
    type: 'asc' | 'desc' | 'normal'
  ): void {
    this.sortedColumn = column;
    const sortedData: IGameRanking[] = this.snakeService
      .playersRanking()
      .sort((a: IGameRanking, b: IGameRanking) => {
        if (type === 'normal') return -1;
        let aValue!: string | number;
        let bValue!: string | number;
        if (
          column === StatsColumnsEnum.NAME ||
          column === StatsColumnsEnum.TIME_PLAYING
        ) {
          aValue = a[column]?.toString() as string;
          bValue = b[column]?.toString() as string;
        } else {
          aValue = Number(a[column]) as number;
          bValue = Number(b[column]) as number;
        }
        if (aValue === bValue) return 0;
        return (type === 'asc' ? aValue < bValue : bValue < aValue) ? -1 : 1;
      });
    if (type === 'normal') return this.sortedDataSource.set([]);
    this.sortedDataSource.set(sortedData);
  }

  private localStorageListener(): void {
    let storage = localStorage.getItem('playersRanking');
    storage = JSON.parse(storage ?? '');
    if (typeof storage !== 'string' && storage !== null) {
      this.snakeService.playersRanking.set(storage);
    }
  }
}
