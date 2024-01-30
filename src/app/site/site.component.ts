import { Component } from '@angular/core';
import { SiteNavComponent } from './site-nav/site-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [SiteNavComponent, MatIconModule, RouterLink],
  templateUrl: './site.component.html',
  styleUrl: './site.component.scss'
})
export class SiteComponent {

}
