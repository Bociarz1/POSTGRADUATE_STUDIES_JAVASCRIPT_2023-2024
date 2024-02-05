import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'snake-menu-logo',
  standalone: true,
  imports: [],
  templateUrl: './menu-logo.component.html',
  styleUrl: './menu-logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MenuLogoComponent {
}
