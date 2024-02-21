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
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../loading/loading.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  error: string = "";
  loading: boolean = false

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passFormControl = new FormControl('', [Validators.required])

  matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  submit(){
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/app'])
        this.loading = false;
      },
      error: (err) => {
        //TO DO: SWITCH CASE ALL ERRORS
        this.error = err;
        alert(err);
        this.loading = false;
      }
    })
    }
    clear(){
    this.email ="";
    this.password = "";
    }
}
