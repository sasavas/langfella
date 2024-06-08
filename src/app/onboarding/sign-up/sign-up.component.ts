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
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink, LoadingComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  email: string = "";
  password: string = "";
  username: string = "";
  error: string = "";
  signupSuccess: boolean = false;
  loading: boolean = false;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passFormControl = new FormControl('', [Validators.required]);
  unameFormControl = new FormControl('', [Validators.required, Validators.minLength(4)])

  matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  submit(){
    this.loading = true;
    this.authService.signup(this.email, this.password, this.username).subscribe({
      next: (response) => {
        this.signupSuccess = true;
        this.loading = false;
      },
      error: (err) => {
        //TO DO: SWITCH CASE ALL ERRORS
        this.error = err.detail;
        alert(this.error);
        this.loading = false;
      }
    })
    }
    clear(){
    this.email ="";
    this.password = "";
    this.username = "";
    }
}
