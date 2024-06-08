import { Component, EventEmitter, Input, Output, 	SimpleChanges} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WordsService } from '../../shared/services/words.service';
import { UserWord } from '../../shared/models/word';

@Component({
  selector: 'app-translate-dialog',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './translate-dialog.component.html',
  styleUrl: './translate-dialog.component.scss'
})
export class TranslateDialogComponent {

  @Output() closingEvent = new EventEmitter<boolean>();
  @Input() userWord: UserWord = {}
  @Input() translateText: string = "";
  @Input() translatedText: any;

  constructor(
    private wordService: WordsService
    ){}

  error: any;
  translatedList: any[] = [];

	ngOnChanges(changes: SimpleChanges) {
		if (changes.translatedText) {
      if(this.translatedText !== null){
        this.translatedList = [];
        for(let item of this.translatedText){
          this.translatedList.push(item.translations)
        }
        this.translatedList = [...new Set(this.translatedList)];
      }
		}
	}

  ngOnDestroy(){
    this.translateText = "";
    this.translatedText = null;
    this.translatedList = [];
  }

  speakText(): void {
    if ('speechSynthesis' in window) {
      // SpeechSynthesisUtterance nesnesi oluşturuluyor
      const utterance = new SpeechSynthesisUtterance(this.translateText);
      // Opsiyonel: Seslendirmede kullanılacak dil ve sesi ayarlayabilirsiniz
      utterance.lang = 'en-US'; // Türkçe için
      // Metni seslendir
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support text to voice conversion.');
    }
  }

  addWord(){
    this.userWord.translations = this.translatedList
    console.log(this.userWord);
    this.wordService.postWord(this.userWord).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        //TO DO: SWITCH CASE ALL ERRORS
        this.error = err.detail;
        alert(this.error);
      }
    });
  }


  close() {
		this.closingEvent.emit(true);
    this.translateText = "";
    this.translatedText = null;
    this.translatedList = [];
	}
}
