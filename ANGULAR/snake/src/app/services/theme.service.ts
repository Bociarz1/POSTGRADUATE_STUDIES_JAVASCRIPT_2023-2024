import {Injectable, signal, WritableSignal} from '@angular/core';
import {GameThemeEnum} from "../enums/game-theme.enum";
import {THEMES} from "../consts/theme.consts";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public theme: WritableSignal<GameThemeEnum> = signal(GameThemeEnum.NORMAL);

  public switchTheme(theme: string | null): void {

    const changeCssVariables = (theme: GameThemeEnum): void => {
      if (theme === GameThemeEnum.NORMAL) {
        document.documentElement.style.setProperty('--textColor', THEMES.normal.textColor);
        document.documentElement.style.setProperty('--primaryColor', THEMES.normal.primaryColor);
        document.documentElement.style.setProperty('--secondaryColor', THEMES.normal.secondaryColor);
      } else {
        document.documentElement.style.setProperty('--textColor', THEMES.highContrast.textColor);
        document.documentElement.style.setProperty('--primaryColor', THEMES.highContrast.primaryColor);
        document.documentElement.style.setProperty('--secondaryColor', THEMES.highContrast.secondaryColor);
      }
    }

    switch (theme) {
      case 'normal':
        this.theme.set(GameThemeEnum.NORMAL);
        changeCssVariables(GameThemeEnum.NORMAL)
        break;
      case 'high-contrast':
        this.theme.set(GameThemeEnum.HIGH_CONTRAST);
        changeCssVariables(GameThemeEnum.HIGH_CONTRAST)
        break;
      default:
        this.theme.set(GameThemeEnum.NORMAL);
        changeCssVariables(GameThemeEnum.NORMAL)
    }
  }
}
