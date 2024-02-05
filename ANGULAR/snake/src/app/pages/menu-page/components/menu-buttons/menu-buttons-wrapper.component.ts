import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IMenuButton } from '../../../../interfaces/menu-buttons.interface.ts.js';
import { menuButtons } from '../../../../consts/menu-buttons.consts.js';
import { MenuButtonActionEnum } from '../../../../enums/menu-buttons.enum.ts.js';
import { SnakeService } from '../../../../services/snake.service.js';

@Component({
  selector: 'snake-menu-buttons-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './menu-buttons-wrapper.component.html',
  styleUrl: './menu-buttons-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuButtonsWrapperComponent {
  protected menuButtons: IMenuButton[] = menuButtons;

  constructor(private snakeService: SnakeService) {}

  protected handleMenuButtonsClick(action: MenuButtonActionEnum) {
    this.snakeService.menuAction.set(action);
  }
}
