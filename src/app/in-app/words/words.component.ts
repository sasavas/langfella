import { Component } from '@angular/core';
import { WordsService } from '../../shared/services/words.service';
import { LogoBasicComponent } from '../../shared/components/logo-basic/logo-basic.component';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-words',
  standalone: true,
  imports: [LogoBasicComponent, RouterLink, MatIconModule],
  templateUrl: './words.component.html',
  styleUrl: './words.component.scss'
})
export class WordsComponent {

  words: any[] = [];
  error: any;

  constructor(
    private wordService: WordsService
  ){}

  ngOnInit(){
    this.wordService.getWords().subscribe({
      next: (response) => {
        console.log(response);
        this.words = response
      },
      error: (err) => {
        //TO DO: SWITCH CASE ALL ERRORS
        this.error = err;
        alert(err);
      }
    });
  }

  deleteWord(id:string){
    this.wordService.deleteWord(id).subscribe({
      next: (response) => {
        console.log(response);
        this.words = this.words.filter(word => word.id !== id);
      },
      error: (err) => {
        //TO DO: SWITCH CASE ALL ERRORS
        this.error = err;
        alert(err);
      }
    });
  }

}
