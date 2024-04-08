import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  Injector,
  OnInit,
  Renderer2,
  Signal,
  ViewChild,
} from '@angular/core';
import {NgxSnakeComponent, NgxSnakeModule} from 'ngx-snake';
import {fromEvent} from 'rxjs';
import {PopupComponent} from '../popup/popup.component';
import {SnakeService} from '../../../../services/snake.service';
import {GameStatusEnum} from '../../../../enums/game-status.enum';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {GameThemeEnum} from "../../../../enums/game-theme.enum";
import {PlayerService} from "../../../../services/player.service";
import {ThemeService} from "../../../../services/theme.service";

@Component({
  selector: 'snake-grid',
  standalone: true,
  imports: [NgxSnakeModule, PopupComponent],
  templateUrl: './snake-grid.component.html',
  styleUrl: './snake-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnakeGridComponent implements OnInit {
  protected actionBtnDisabled: Signal<boolean> = computed(
    () => this.playerService.gameStatus() !== GameStatusEnum.STARTED
  );
  private prevGameStatus!: GameStatusEnum;
  @ViewChild('game') snakeComponent!: NgxSnakeComponent;
  @ViewChild('snakeGrid') snakeGrid!: ElementRef;
  @ViewChild('enterBtn') enterBtn!: ElementRef;
  @ViewChild('escBtn') escBtn!: ElementRef;
  @ViewChild('wBtn') wBtn!: ElementRef;
  @ViewChild('aBtn') aBtn!: ElementRef;
  @ViewChild('sBtn') sBtn!: ElementRef;
  @ViewChild('dBtn') dBtn!: ElementRef;

  private destroyRef: DestroyRef = inject(DestroyRef);
  private renderer: Renderer2 = inject(Renderer2);
  private injector: Injector = inject(Injector);
  private playerService: PlayerService = inject(PlayerService);
  private snakeService: SnakeService = inject(SnakeService);
  private themeService: ThemeService = inject(ThemeService);

  constructor() {
    this.gameStatusChangeListener();
  }

  public ngOnInit(): void {
    this.keyDownListener();
    this.keyUpListener();
    this.changeThemeListener();
  }

  private keyDownListener(): void {
    const keyDownEvent$ = fromEvent(document, 'keydown');
    keyDownEvent$
      // .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        this.handleKeyDown(event as KeyboardEvent);
      });
  }

  private keyUpListener(): void {
    const keyDownEvent$ = fromEvent(document, 'keyup');
    keyDownEvent$
      // .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        this.handleKeyUp(event as KeyboardEvent);
      });
  }

  private gameStatusChangeListener(): void {
    toObservable(this.playerService.gameStatus)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status: GameStatusEnum) => {
        this.playerService.saveActionInStorage();
        if (
          this.prevGameStatus === GameStatusEnum.READY &&
          status === GameStatusEnum.STARTED
        ) {
          this.handleRestartGame();
        }
        if (status === GameStatusEnum.STARTED) this.handleStartGame();
        this.prevGameStatus = status;
      });
  }

  protected handleKeyDown(
    event: KeyboardEvent,
    addClass: boolean = true
  ): void {
    const {key} = event || {};
    if (!key && !this.snakeComponent) return;
    switch (key) {
      case 'w':
        if (addClass) {
          this.renderer.addClass(this.wBtn.nativeElement, 'key-hover');
        }
        this.handleSnakeMoveUp();
        break;
      case 's':
        if (addClass) {
          this.renderer.addClass(this.sBtn.nativeElement, 'key-hover');
        }
        this.handleSnakeMoveDown();
        break;
      case 'a':
        if (addClass) {
          this.renderer.addClass(this.aBtn.nativeElement, 'key-hover');
        }
        this.handleSnakeMoveLeft();
        break;
      case 'd':
        if (addClass) {
          this.renderer.addClass(this.dBtn.nativeElement, 'key-hover');
        }
        this.handleSnakeMoveRight();
        break;
      case 'Enter':
        if (addClass) {
          this.renderer.addClass(this.enterBtn.nativeElement, 'key-hover');
        }
        if (this.playerService.gameStatus() === GameStatusEnum.STARTED) return;
        if (this.playerService.gameStatus() === GameStatusEnum.READY) {
          this.handleRestartGame();
        }
        this.handleStartGame();
        break;
      case 'Escape':
        if (addClass) {
          this.renderer.addClass(this.escBtn.nativeElement, 'key-hover');
        }
        if (this.playerService.gameStatus() !== GameStatusEnum.STARTED) return;
        this.handlePausedGame();
        break;
    }
  }

  private handleKeyUp(event: KeyboardEvent): void {
    const {key} = event || {};
    if (!key && !this.snakeComponent) return;
    switch (key) {
      case 'w':
        this.renderer.removeClass(this.wBtn.nativeElement, 'key-hover');
        break;
      case 's':
        this.renderer.removeClass(this.sBtn.nativeElement, 'key-hover');
        break;
      case 'a':
        this.renderer.removeClass(this.aBtn.nativeElement, 'key-hover');
        break;
      case 'd':
        this.renderer.removeClass(this.dBtn.nativeElement, 'key-hover');
        break;
      case 'Enter':
        this.renderer.removeClass(this.enterBtn.nativeElement, 'key-hover');
        break;
      case 'Escape':
        this.renderer.removeClass(this.escBtn.nativeElement, 'key-hover');
        break;
    }
  }

  protected gameOverListener(): void {
    this.playerService.gameStatus.set(GameStatusEnum.READY);
    this.snakeService.postNewScore();
    this.playerService.saveScoreInStorage()
  }

  protected addPointListener(): void {
    this.playerService.score.update((prev) => prev + 1);
  }

  protected handleSnakeMoveUp(): void {
    if (this.playerService.gameStatus() !== GameStatusEnum.STARTED) return;
    this.snakeComponent.actionUp();
  }

  protected handleSnakeMoveDown(): void {
    if (this.playerService.gameStatus() !== GameStatusEnum.STARTED) return;
    this.snakeComponent.actionDown();
  }

  protected handleSnakeMoveRight(): void {
    if (this.playerService.gameStatus() !== GameStatusEnum.STARTED) return;
    this.snakeComponent.actionRight();
  }

  protected handleSnakeMoveLeft(): void {
    if (this.playerService.gameStatus() !== GameStatusEnum.STARTED) return;
    this.snakeComponent.actionLeft();
  }

  protected handleRestartGame(): void {
    this.snakeComponent.actionReset();
    this.playerService.score.set(0);
    this.playerService.gameStatus.set(GameStatusEnum.STARTED);
  }

  protected handleStartGame(): void {
    this.snakeComponent.actionStart();
    this.playerService.gameStatus.set(GameStatusEnum.STARTED);
  }

  protected handlePausedGame(): void {
    this.snakeComponent.actionStop();
    this.playerService.gameStatus.set(GameStatusEnum.PAUSED);
  }

  protected createKeyboardEvent(event: string): KeyboardEvent {
    return new KeyboardEvent('keydown', {
      key: event,
      code: event,
      keyCode: 13,
      which: 13,
      bubbles: true,
      cancelable: true,
    });
  }

  private changeThemeListener(): void {
    toObservable(this.themeService.theme, {
      injector: this.injector
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((theme: GameThemeEnum) => {
      this.changeSnakeGridTheme(theme);
    })
  }

  protected changeSnakeGridTheme(theme: GameThemeEnum): void {
    if (theme === GameThemeEnum.HIGH_CONTRAST) {
      this.renderer.addClass(this.snakeGrid.nativeElement, 'snake-high-contrast')
    } else {
      this.renderer.removeClass(this.snakeGrid.nativeElement, 'snake-high-contrast')
    }
  }
}
