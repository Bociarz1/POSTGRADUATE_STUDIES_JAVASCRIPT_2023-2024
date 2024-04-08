import {Component, inject, OnInit, Signal,} from '@angular/core';
import {SnakeGridComponent} from '../../components/snake-grid/snake-grid.component';
import {
  PlayerRankingTableComponent
} from '../../../../shared-components/player-ranking-table/player-ranking-table.component';
import {
  GameplayHistoryTableComponent
} from '../../../../shared-components/gameplay-history-table/gameplay-history-table.component';
import {CommonModule} from '@angular/common';
import {interval, map} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {StatusPipe} from '../../../../pipes/status.pipe';
import {ActivatedRoute, Router} from "@angular/router";
import {ThemeSwitcherComponent} from "../../../../shared-components/theme-switcher/theme-switcher.component";
import {ThemeService} from "../../../../services/theme.service";
import {PlayerService} from "../../../../services/player.service";
import {
  PlayerScoresTableComponent
} from "../../../../shared-components/player-scores-table/player-scores-table.component";

@Component({
  selector: 'snake-view-game',
  standalone: true,
  templateUrl: './view-game.component.html',
  styleUrl: './view-game.component.scss',
  imports: [
    SnakeGridComponent,
    PlayerRankingTableComponent,
    GameplayHistoryTableComponent,
    CommonModule,
    StatusPipe,
    ThemeSwitcherComponent,
    PlayerScoresTableComponent,
  ],
})
export class ViewGameComponent implements OnInit {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private themeService: ThemeService = inject(ThemeService);
  protected playerService: PlayerService = inject(PlayerService);

  protected playingTime: Signal<number | undefined> = toSignal(
    interval(1000).pipe(
      map((seconds) => {
        return new Date(0).setUTCSeconds(seconds);
      })
    )
  );

  protected goToMenu(): void {
    this.router.navigate(['menu', this.themeService.theme()]);
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const theme: string | null = params.get('theme');
      this.themeService.switchTheme(theme);
    });
  }
}
