import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-in-app',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './in-app.component.html',
  styleUrl: './in-app.component.scss'
})
export class InAppComponent {
  isAuthenticated: boolean = false;
}
