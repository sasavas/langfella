import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo-basic',
  standalone: true,
  imports: [],
  templateUrl: './logo-basic.component.html',
  styleUrl: './logo-basic.component.scss'
})
export class LogoBasicComponent {
 @Input() type: number = 1
}
