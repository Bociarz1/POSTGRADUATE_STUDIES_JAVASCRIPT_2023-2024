import {FormControl} from '@angular/forms';

export interface IMenuForm {
  playerName: FormControl<string | null>;
  authToken: FormControl<string | null>;
}
