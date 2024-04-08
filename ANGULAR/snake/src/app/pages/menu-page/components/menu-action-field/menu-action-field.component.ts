import {ChangeDetectionStrategy, Component, computed, Input, Signal, signal, WritableSignal,} from '@angular/core';
import {MenuButtonActionEnum} from '../../../../enums/menu-buttons.enum.ts.js';
import {MenuActionFieldFormComponent} from '../menu-action-field-form/menu-action-field-form.component.js';
import {
  PlayerRankingTableComponent
} from '../../../../shared-components/player-ranking-table/player-ranking-table.component.js';

@Component({
  selector: 'snake-menu-action-field',
  standalone: true,
  imports: [MenuActionFieldFormComponent, PlayerRankingTableComponent],
  templateUrl: './menu-action-field.component.html',
  styleUrl: './menu-action-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuActionFieldComponent {
  @Input('fieldType') set _fieldType(value: MenuButtonActionEnum) {
    this.fieldType.set(value);
  }

  protected fieldType: WritableSignal<MenuButtonActionEnum> = signal(
    MenuButtonActionEnum.SHOW_MENU
  );

  protected fieldVisibility: Signal<boolean> = computed(
    () => this.fieldType() !== MenuButtonActionEnum.SHOW_MENU
  );
  protected MenuButtonActionEnum = MenuButtonActionEnum;
}
