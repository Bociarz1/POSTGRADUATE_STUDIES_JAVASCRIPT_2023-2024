import { FormControl } from '@angular/forms';

export interface IMenuForm {
  playerName: FormControl<string | null>;
  playerEmail: FormControl<string | null>;
}
