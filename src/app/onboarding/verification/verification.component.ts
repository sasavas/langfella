import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent {
  verifyId: any = ""
  error: string = "";
  loading: boolean = false;

  constructor(
		private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
	) { }


  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.verifyId = params['verifyId'];
      this.authService.verify(this.verifyId).subscribe({
        next: (response) => {
          this.router.navigate(['/app'])
          this.loading = false;
          console.log(response);
        },
        error: (err) => {
          //TO DO: SWITCH CASE ALL ERRORS
          console.log(err);
          this.error = err;
          this.loading = false;
        }
      })
    });
  }

}
