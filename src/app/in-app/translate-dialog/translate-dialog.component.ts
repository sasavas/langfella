import { Component, EventEmitter, Input, Output, 	SimpleChanges} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-translate-dialog',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './translate-dialog.component.html',
  styleUrl: './translate-dialog.component.scss'
})
export class TranslateDialogComponent {

  @Output() closingEvent = new EventEmitter<boolean>();
  @Input() translateText: string = "";
  @Input() translatedText: any;

  translatedList: any[] = [];

	ngOnChanges(changes: SimpleChanges) {
		if (changes.translatedText) {
      if(this.translatedText !== null){
        for(let item of this.translatedText){
          this.translatedList.push(item.translations)
        }
        this.translatedList = [...new Set(this.translatedList)];
      }
		}
	}

  speakText(): void {
    if ('speechSynthesis' in window) {
      // SpeechSynthesisUtterance nesnesi oluşturuluyor
      const utterance = new SpeechSynthesisUtterance(this.translateText);
      // Opsiyonel: Seslendirmede kullanılacak dil ve sesi ayarlayabilirsiniz
      utterance.lang = 'en-US'; // Türkçe için
      
      const availableVoices = window.speechSynthesis.getVoices();
      console.log(availableVoices)
      // Metni seslendir
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Üzgünüz, tarayıcınız metni sese dönüştürme özelliğini desteklemiyor.');
    }
  }


  close() {
		this.closingEvent.emit(true);
	}
}
