import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { LogoBasicComponent } from '../shared/components/logo-basic/logo-basic.component';
import { AuthService } from '../shared/services/auth.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [RouterOutlet, LogoBasicComponent, MatIconModule, RouterLink],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
  isAuthenticated: boolean = false
  web: boolean = true
  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if(this.isAuthenticated){
        this.router.navigate(['/app'])
      }else{
        // this.router.navigate(['lobby/login'])
      }
    });

  }

}
