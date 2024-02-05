import { Component } from '@angular/core';
import { MenuButtonsWrapperComponent } from '../../components/menu-buttons/menu-buttons-wrapper.component';
import { MenuLogoComponent } from '../../components/menu-logo/menu-logo.component';
import { MenuActionFieldComponent } from '../../components/menu-action-field/menu-action-field.component';
import { SnakeService } from '../../../../services/snake.service';

@Component({
  selector: 'snake-view-menu',
  standalone: true,
  imports: [
    MenuButtonsWrapperComponent,
    MenuLogoComponent,
    MenuActionFieldComponent,
  ],
  templateUrl: './view-menu.component.html',
  styleUrl: './view-menu.component.scss',
})
export class ViewMenuComponent {
  constructor(protected snakeService: SnakeService) {}
}
