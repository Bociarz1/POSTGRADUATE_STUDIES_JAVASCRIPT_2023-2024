import {Component, computed, inject, Signal} from '@angular/core';
import {SnakeService} from "../../services/snake.service";
import {GameThemeEnum} from "../../enums/game-theme.enum";
import {NgClass} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent {
  protected isNormalTheme: Signal<boolean> = computed(() => this.themeService.theme() === GameThemeEnum.NORMAL)
  protected readonly GameThemeEnum = GameThemeEnum;

  protected snakeService: SnakeService = inject(SnakeService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private themeService: ThemeService = inject(ThemeService);

  protected handleThemeSwitch(theme: GameThemeEnum) {
    const currentUrlSegments = this.route.snapshot.url.map(segment => segment.path);
    const index = currentUrlSegments.findIndex(segment => segment === 'high-contrast' || segment === 'normal');
    if (theme === GameThemeEnum.NORMAL) {
      currentUrlSegments[index] = GameThemeEnum.NORMAL;
    } else {
      currentUrlSegments[index] = GameThemeEnum.HIGH_CONTRAST;
    }
    const newUrl = ['/' + currentUrlSegments.join('/')];
    this.router.navigate(newUrl, {relativeTo: this.route});
  }
}
