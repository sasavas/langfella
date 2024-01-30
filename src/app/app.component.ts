import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Langfella';
  isAuthenticated: boolean = false;
  uname: any = null;

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(){
    this.authService.autoLogin();
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.uname = user?.email.split('@')[0];
    });
  }
}
