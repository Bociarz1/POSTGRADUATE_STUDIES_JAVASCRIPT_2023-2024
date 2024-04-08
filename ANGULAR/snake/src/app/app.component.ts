import {Component} from '@angular/core';
import {ViewMenuComponent} from './pages/menu-page/view/view-menu/view-menu.component';
import {ViewGameComponent} from './pages/game-page/view/view-game/view-game.component';
import {RouterModule, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ViewMenuComponent, ViewGameComponent, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
