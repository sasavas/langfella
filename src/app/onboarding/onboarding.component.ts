import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { LogoBasicComponent } from '../logo-basic/logo-basic.component';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [RouterOutlet, LogoBasicComponent],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
  isAuthenticated: boolean = false
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
        this.router.navigate(['onboarding/login'])
      }
    });
    
  }

}
