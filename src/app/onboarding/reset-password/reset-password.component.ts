import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink, LoadingComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  passFormControl = new FormControl('', [Validators.required, Validators.minLength(6)])
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  email: string = "";
  password: string = "";
  loading: boolean = false
  matcher = new MyErrorStateMatcher();
  verificationCode = "";
  sendToMailSuccess: boolean = false;
  resetSuccess: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      if(params['verificationCode'] !== 'reset'){
        this.verificationCode = params['verificationCode'];
      }
      console.log(this.verificationCode)
    });
  }

  submit(){
    this.loading = true;
      if(!this.verificationCode){
        this.authService.resetPassword(this.email).subscribe({
          next: (response) => {
            console.log(response);
            this.sendToMailSuccess = true;
            this.loading = false;
          },
          error: (err) => {
            //TO DO: SWITCH CASE ALL ERRORS
            alert(err);
            this.loading = false;
          }
        })
    }else{
      this.authService.verifyPasswordReset(this.verificationCode, this.password).subscribe({
        next: (response) => {
          console.log(response);
          this.resetSuccess = true;
          this.loading = false;
        },
        error: (err) => {
          //TO DO: SWITCH CASE ALL ERRORS
          alert(err);
          this.loading = false;
        }
      })
    }
  }

   
    clear(){
    this.email ="";
    this.password = "";
    }

}
