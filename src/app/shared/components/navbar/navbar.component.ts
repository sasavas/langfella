import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private router: Router) {}

  goTo(screen: number) {
    if (screen === 1) {
      this.router.navigate(['app']);
    } else if (screen === 2) {
      this.router.navigate(['app/word']);
      console.log();
    }
  }
}
