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

  playCard: boolean = false;
  playCardResult: boolean = false;
  flashCard: any = null;
  
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

  flashcard(){
    if(this.playCard){
      this.playCard = false;
      this.playCardResult = false;
      this.flashCard = null;
    }else{
      this.playCard = true;
      this.flashCard = this.getRandomElement(this.words);
      console.log(this.flashCard)
    }
  }

  cardResult(){
    if(this.playCardResult){
      this.playCardResult = false
    }else{
      this.playCardResult = true
    }
  }

  getRandomElement(words: any[]) {
    if(words.length === 0) throw new Error("Dizi boş.");
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

}
