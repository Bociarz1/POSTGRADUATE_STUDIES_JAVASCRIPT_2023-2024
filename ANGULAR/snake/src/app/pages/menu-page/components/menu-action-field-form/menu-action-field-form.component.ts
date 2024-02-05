import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SnakeService } from '../../../../services/snake.service';
import { ViewEnum } from '../../../../enums/view.enum';
import { IMenuForm } from '../../../../interfaces/menu-form.interface';

@Component({
  selector: 'menu-action-field-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './menu-action-field-form.component.html',
  styleUrl: './menu-action-field-form.component.scss',
})
export class MenuActionFieldFormComponent implements OnInit {
  form!: FormGroup<IMenuForm>;
  constructor(
    private formBuilder: FormBuilder,
    private snakeService: SnakeService
  ) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      playerName: new FormControl('', [
        Validators.minLength(1),
        Validators.required,
      ]),
      playerEmail: new FormControl('', [
        Validators.minLength(1),
        Validators.required,
        Validators.email,
      ]),
    });
  }

  protected submit() {
    if (!this.form.controls.playerName.valid) {
      this.form.controls.playerName.markAsTouched();
      return;
    }
    if (!this.form.controls.playerEmail.valid) {
      this.form.controls.playerEmail.markAsTouched();
      return;
    }
    this.snakeService.playerName = this.form.controls.playerName
      .value as string;
    this.snakeService.playerEmail = this.form.controls.playerEmail
      .value as string;
    this.snakeService.snakeView.set(ViewEnum.GAME);
  }
}
