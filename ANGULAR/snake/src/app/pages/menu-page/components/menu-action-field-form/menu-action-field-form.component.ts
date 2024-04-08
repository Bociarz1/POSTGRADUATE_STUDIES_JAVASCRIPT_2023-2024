import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {IMenuForm} from '../../../../interfaces/menu-form.interface';
import {Router} from "@angular/router";
import {ApiService} from "../../../../services/api.service";
import {ICheckAuthTokenRequest, ICheckAuthTokenResponse} from "../../../../interfaces/api-response.interface";
import {catchError, of} from "rxjs";
import {PlayerService} from "../../../../services/player.service";
import {ThemeService} from "../../../../services/theme.service";

@Component({
  selector: 'menu-action-field-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './menu-action-field-form.component.html',
  styleUrl: './menu-action-field-form.component.scss',
})
export class MenuActionFieldFormComponent implements OnInit {
  form!: FormGroup<IMenuForm>;

  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private apiService: ApiService = inject(ApiService);
  private playerService: PlayerService = inject(PlayerService);
  private themeService: ThemeService = inject(ThemeService);

  public ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      playerName: new FormControl('', [
        Validators.minLength(1),
        Validators.required,
      ]),
      authToken: new FormControl('', [
        Validators.minLength(1),
        Validators.required,
      ]),
    });
  }

  protected submit() {
    if (!this.form.controls.playerName.valid) {
      this.form.controls.playerName.markAsTouched();
      return;
    }
    if (!this.form.controls.authToken.valid) {
      this.form.controls.authToken.markAsTouched();
      return;
    }
    this.playerService.name.set(this.form.controls.playerName.value as string);
    const payload: ICheckAuthTokenRequest = {
      ['auth-token']: this.form.controls.authToken.value || ''
    }
    this.apiService.checkAuthToken(payload).pipe(catchError(() => of())).subscribe((res: ICheckAuthTokenResponse) => {
      if (res.success) {
        this.playerService.authToken.set(this.form.controls.authToken.value as string)
        this.router.navigate(['game', this.themeService.theme()]);
      } else {
        alert('Auth token invalid')
      }
    })
  }
}
