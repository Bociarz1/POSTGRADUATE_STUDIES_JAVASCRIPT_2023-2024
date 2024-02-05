import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  Renderer2,
  Signal,
  ViewChild,
  computed,
  effect,
} from '@angular/core';
import { NgxSnakeComponent, NgxSnakeModule } from 'ngx-snake';
import { fromEvent } from 'rxjs';
import { PopupComponent } from '../popup/popup.component';
import { SnakeService } from '../../../../services/snake.service';
import { GameStatusEnum } from '../../../../enums/game-status.enum';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'snake-grid',
  standalone: true,
  imports: [NgxSnakeModule, PopupComponent],
  templateUrl: './snake-grid.component.html',
  styleUrl: './snake-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnakeGridComponent implements OnInit {
  actionBtnDisabled: Signal<boolean> = computed(
    () => this.snakeService.gameStatus() !== GameStatusEnum.STARTED
  );
  private prevGameStatus!: GameStatusEnum;
  @ViewChild('game') snakeRef!: NgxSnakeComponent;
  @ViewChild('enterBtn') enterBtn!: ElementRef;
  @ViewChild('escBtn') escBtn!: ElementRef;
  @ViewChild('wBtn') wBtn!: ElementRef;
  @ViewChild('aBtn') aBtn!: ElementRef;
  @ViewChild('sBtn') sBtn!: ElementRef;
  @ViewChild('dBtn') dBtn!: ElementRef;

  constructor(
    private destroyRef: DestroyRef,
    protected snakeService: SnakeService,
    private renderer: Renderer2
  ) {
    this.gameStatusChangeListener();
  }

  public ngOnInit(): void {
    this.keyDownListener();
    this.keyUpListener();
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
    toObservable(this.snakeService.gameStatus)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status: GameStatusEnum) => {
        this.snakeService.noticePlayerActionInStorage();
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
    const { key } = event || {};
    if (!key && !this.snakeRef) return;
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
        if (this.snakeService.gameStatus() === GameStatusEnum.STARTED) return;
        if (this.snakeService.gameStatus() === GameStatusEnum.READY) {
          this.handleRestartGame();
        }
        this.handleStartGame();
        break;
      case 'Escape':
        if (addClass) {
          this.renderer.addClass(this.escBtn.nativeElement, 'key-hover');
        }
        if (this.snakeService.gameStatus() !== GameStatusEnum.STARTED) return;
        this.handlePausedGame();
        break;
    }
  }

  private handleKeyUp(event: KeyboardEvent): void {
    const { key } = event || {};
    if (!key && !this.snakeRef) return;
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
    this.snakeService.gameStatus.set(GameStatusEnum.READY);
    this.snakeService.noticeScoreInStorage();
  }
  protected addPointListener(): void {
    this.snakeService.gameScore.update((prev) => prev + 1);
  }

  protected handleSnakeMoveUp(): void {
    if (this.snakeService.gameStatus() !== GameStatusEnum.STARTED) return;
    this.snakeRef.actionUp();
  }
  protected handleSnakeMoveDown(): void {
    if (this.snakeService.gameStatus() !== GameStatusEnum.STARTED) return;
    this.snakeRef.actionDown();
  }
  protected handleSnakeMoveRight(): void {
    if (this.snakeService.gameStatus() !== GameStatusEnum.STARTED) return;
    this.snakeRef.actionRight();
  }
  protected handleSnakeMoveLeft(): void {
    if (this.snakeService.gameStatus() !== GameStatusEnum.STARTED) return;
    this.snakeRef.actionLeft();
  }
  protected handleRestartGame(): void {
    this.snakeRef.actionReset();
    this.snakeService.gameScore.set(0);
    this.snakeService.gameStatus.set(GameStatusEnum.STARTED);
  }
  protected handleStartGame(): void {
    this.snakeRef.actionStart();
    this.snakeService.gameStatus.set(GameStatusEnum.STARTED);
  }
  protected handlePausedGame(): void {
    this.snakeRef.actionStop();
    this.snakeService.gameStatus.set(GameStatusEnum.PAUSED);
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
}
