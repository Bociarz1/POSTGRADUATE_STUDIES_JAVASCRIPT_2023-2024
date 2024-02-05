import { Component } from '@angular/core';
import { ViewMenuComponent } from './pages/menu-page/view/view-menu/view-menu.component';
import { SnakeService } from './services/snake.service';
import { ViewEnum } from './enums/view.enum';
import { ViewGameComponent } from './pages/game-page/view/view-game/view-game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ViewMenuComponent, ViewGameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected ViewEnum = ViewEnum;
  constructor(protected snakeService: SnakeService) {}
}
