import {Routes} from '@angular/router';
import {ViewMenuComponent} from "./pages/menu-page/view/view-menu/view-menu.component";
import {ViewGameComponent} from "./pages/game-page/view/view-game/view-game.component";
import {AuthGuard} from "./services/auth-guard.service";


export const routes: Routes = [
  {path: '', redirectTo: 'menu/normal', pathMatch: 'full',},
  {path: 'menu/:theme', title: "Menu Page", component: ViewMenuComponent},
  {path: 'game/:theme', title: "Game Page", component: ViewGameComponent, canActivate: [AuthGuard]},
];
