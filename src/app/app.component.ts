import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import $ from "jquery";

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

  wrapWordsInSpan(text: string) {
    // Split the text into an array of words
    let words = text.split(' ');

    // Map each word to a new array with each word wrapped in a span tag
    let wordsInSpan = words.map(word => `<span>${word}</span>`);

    // Join the array back into a single string, with each word in a span tag
    let textInSpan = wordsInSpan.join('');

    return textInSpan;
  }
}
