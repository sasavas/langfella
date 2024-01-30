import { Component } from '@angular/core';
import { LogoBasicComponent } from '../../logo-basic/logo-basic.component';

@Component({
  selector: 'app-site-nav',
  standalone: true,
  imports: [LogoBasicComponent],
  templateUrl: './site-nav.component.html',
  styleUrl: './site-nav.component.scss'
})
export class SiteNavComponent {

}
