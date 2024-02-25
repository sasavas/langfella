import { Component } from '@angular/core';
import { LogoBasicComponent } from '../../../shared/components/logo-basic/logo-basic.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-nav',
  standalone: true,
  imports: [LogoBasicComponent, RouterLink],
  templateUrl: './site-nav.component.html',
  styleUrl: './site-nav.component.scss'
})
export class SiteNavComponent {

}
