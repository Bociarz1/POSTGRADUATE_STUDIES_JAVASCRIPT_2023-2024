import {Component, inject, OnInit} from '@angular/core';
import {MenuButtonsWrapperComponent} from '../../components/menu-buttons/menu-buttons-wrapper.component';
import {MenuLogoComponent} from '../../components/menu-logo/menu-logo.component';
import {MenuActionFieldComponent} from '../../components/menu-action-field/menu-action-field.component';
import {ActivatedRoute} from "@angular/router";
import {ThemeSwitcherComponent} from "../../../../shared-components/theme-switcher/theme-switcher.component";
import {PlayerService} from "../../../../services/player.service";
import {ThemeService} from "../../../../services/theme.service";
import {SnakeService} from "../../../../services/snake.service";

@Component({
  selector: 'snake-view-menu',
  standalone: true,
  imports: [
    MenuButtonsWrapperComponent,
    MenuLogoComponent,
    MenuActionFieldComponent,
    ThemeSwitcherComponent,
  ],
  templateUrl: './view-menu.component.html',
  styleUrl: './view-menu.component.scss',
})
export class ViewMenuComponent implements OnInit {
  private playerService: PlayerService = inject(PlayerService);
  protected snakeService: SnakeService = inject(SnakeService);
  private themeService: ThemeService = inject(ThemeService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.playerService.resetUserData();
    this.route.paramMap.subscribe(params => {
      const theme: string | null = params.get('theme');
      this.themeService.switchTheme(theme);
    });
  }
}
