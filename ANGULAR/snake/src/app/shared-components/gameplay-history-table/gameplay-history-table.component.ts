import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { IGameplayHistory } from '../../interfaces/gameplay-history.interface';
import { GameplayColumnsEnum } from '../../enums/gameplay-columns.enum';
import { SnakeService } from '../../services/snake.service';
import { CommonModule } from '@angular/common';
import { GameStatusEnum } from '../../enums/game-status.enum';
import { StatusPipe } from '../../pipes/status.pipe';

@Component({
  selector: 'app-gameplay-history-table',
  standalone: true,
  templateUrl: './gameplay-history-table.component.html',
  styleUrl: './gameplay-history-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, StatusPipe],
})
export class GameplayHistoryTableComponent {
  protected dataSource: Signal<IGameplayHistory[]> = computed(() => {
    if (this.isNoResult) {
      this.isNoResult = false;
      return this.filteredDataSource();
    }
    if (this.sortedDataSource().length > 0) {
      return this.sortedDataSource();
    }
    if (this.filteredDataSource().length > 0) {
      return this.filteredDataSource();
    }
    return this.snakeService.gameplayHistory();
  });
  protected filteredValue: GameStatusEnum = GameStatusEnum.UNKNOWN;
  protected sortedColumn!: GameplayColumnsEnum;
  protected isNoResult: boolean = false;
  protected sortedDataSource: WritableSignal<IGameplayHistory[]> = signal([]);
  protected filteredDataSource: WritableSignal<IGameplayHistory[]> = signal([]);
  protected GameplayColumnsEnum = GameplayColumnsEnum;
  protected GameStatusEnum = GameStatusEnum;

  constructor(protected snakeService: SnakeService) {}

  protected sort(
    column: GameplayColumnsEnum,
    type: 'asc' | 'desc' | 'normal'
  ): void {
    this.sortedColumn = column;
    const sortedArray =
      this.filteredDataSource().length > 0
        ? this.filteredDataSource()
        : this.snakeService.gameplayHistory();
    const sortedData: IGameplayHistory[] = sortedArray.sort(
      (a: IGameplayHistory, b: IGameplayHistory) => {
        if (type === 'normal') return -1;
        let aValue!: string | number;
        let bValue!: string | number;
        if (column === GameplayColumnsEnum.DATE) {
          aValue = a[column]?.toString() as string;
          bValue = b[column]?.toString() as string;
        } else {
          aValue = Number(a[column]);
          bValue = Number(b[column]);
        }
        if (aValue === bValue) return 0;
        return (type === 'asc' ? aValue < bValue : bValue < aValue) ? -1 : 1;
      }
    );
    if (type === 'normal') return this.sortedDataSource.set([]);
    this.sortedDataSource.set(sortedData);
  }

  protected filter(actionType: GameStatusEnum): void {
    this.sortedDataSource.set([]);
    this.filteredValue = actionType;
    if (actionType === GameStatusEnum.UNKNOWN) {
      this.isNoResult = false;
      this.filteredDataSource.set([]);
      return;
    }
    const filteredData: IGameplayHistory[] = this.snakeService
      .gameplayHistory()
      .filter((item: IGameplayHistory) => {
        return item.action === actionType;
      });

    if (filteredData.length === 0) {
      this.isNoResult = true;
    }
    this.filteredDataSource.set(filteredData);
  }
}
