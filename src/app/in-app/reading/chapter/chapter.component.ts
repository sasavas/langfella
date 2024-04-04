import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LogoBasicComponent } from '../../../shared/components/logo-basic/logo-basic.component';
import { TranslateDialogComponent } from '../../translate-dialog/translate-dialog.component';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../shared/services/translations.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [LogoBasicComponent, TranslateDialogComponent, CommonModule, MatIconModule],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss',
})
export class ChapterComponent {
  @Input() chapterData: any;
  @Input() sourceLanguage: any;
  @Output() closingEvent = new EventEmitter<boolean>();




  translation: any = null;
  translated: any = null;
  clickActive: boolean = false;
  OS: any = null
  error: any;

  translationDialog: boolean = false;

  androidTranslation: any = null;
  maxCharAndroid: boolean = false;
  showAndroidTranslation: boolean = false;

  constructor(
    private translationService: TranslationService
  ) {}

  close() {
    this.closingEvent.emit(true);
    console.log('selami');
  }

  ngOnInit() {
    this.getOS();
    if(this.OS == 'Android'){
      document.addEventListener('selectionchange', this.handleSelectionChange);
    }
  }

  ngOnDestroy() {
    // Event listener'ı temizle
    document.removeEventListener('selectionchange', this.handleSelectionChange);

    this.translation = null;
    this.translated = null;
    this.clickActive = false;
  
    this.androidTranslation = null;
    this.maxCharAndroid = false;
    this.showAndroidTranslation = false;

    window.speechSynthesis.cancel();
  }


  test(){
    
  }


  getClickedWord(event: MouseEvent | TouchEvent): void {
    let s = window.getSelection();

     if (s && s.anchorNode && s.toString().length > 0) {
      if(s && s.anchorNode && s.toString().length > 25) {
        alert("The selected translation content cannot be longer than 25 characters")
      }else{
        if (event instanceof TouchEvent && event.changedTouches.length > 0) {
          // alert("touch");
          this.translation = s.toString();
          this.translationService.getTranslation(this.translation, this.sourceLanguage, "tr").subscribe({
            next: (response) => {
              console.log(response);
              this.translated = response;
            },
            error: (err) => {
              //TO DO: SWITCH CASE ALL ERRORS
              this.error = err;
              alert(err);
            }
          });
          setTimeout(() => {
            if (window.getSelection) {
              window.getSelection()?.removeAllRanges();
            }
          }, 100);
       }else{
        // alert("click");
        this.clickActive = true;
        let range = s.getRangeAt(0);
        let node: any = s.anchorNode;
        let startOffset = range.startOffset;
        let endOffset = range.endOffset;
        let startNode: any = node;
        let endNode: any = node;
 
       //  Find start node and offset
        while (startOffset > 0 && startNode.textContent[startOffset - 1] != ' ') {
          startOffset -= 1;
        }
        if (startOffset == 0) {
          startNode = startNode.previousSibling;
          while (startNode && startNode.nodeType != Node.TEXT_NODE) {
            startNode = startNode.lastChild;
          }
          if (!startNode) {
            startNode = node;
          } else {
            startOffset = startNode.textContent.length;
          }
        }
 
       //  Find end node and offset
        while (
          endOffset < node.textContent.length &&
          node.textContent[endOffset] != ' '
        ) {
          endOffset += 1;
        }
        if (endOffset == node.textContent.length) {
          endNode = endNode.nextSibling;
          while (endNode && endNode.nodeType != Node.TEXT_NODE) {
            endNode = endNode.firstChild;
          }
          if (!endNode) {
            endNode = node;
          } else {
            endOffset = 0;
          }
        }

        //  Create new range and select it
          let newRange = document.createRange();
          newRange.setStart(startNode, startOffset);
          newRange.setEnd(endNode, endOffset);
          s.removeAllRanges();
          s.addRange(newRange);
          let str = newRange
          .toString()
          .trim()
          .replace(/[.,;"]/g, '');
          this.translation = str;
          this.translationService.getTranslation(this.translation, this.sourceLanguage, "tr").subscribe({
            next: (response) => {
              console.log(response);
              this.translated = response;
            },
            error: (err) => {
              //TO DO: SWITCH CASE ALL ERRORS
              this.error = err;
              alert(err);
            }
          });
          window.getSelection()?.removeAllRanges();
       }
      }

     } else {
      // Hiçbir metin seçilmemişse, MouseEvent kullanarak tıklanan kelimeyi bulma mantığı burada olur
      // Bu örnek, tıklanan kelimeyi doğrudan bulma işlevselliğini basitleştirir
      const target = event.target as HTMLElement;
      if (target && target.textContent) {

      }
    }
  }

  handleSelectionChange = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      if( selection.toString().length > 25) {
        this.maxCharAndroid = true;
        this.translation = "The maximum character length for translation is 25";
      }else{
        const selectedText = selection.toString();
        this.translation = selectedText;
        this.maxCharAndroid = false;
      }
    }else{
      this.translation = null;
      this.maxCharAndroid = false;
    }
  }

  translateForAndroid(){
    this.androidTranslation = this.translation;
    this.translationService.getTranslation(this.androidTranslation, this.sourceLanguage, "tr").subscribe({
      next: (response) => {
        console.log(response);
        this.translated = response;
      },
      error: (err) => {
        //TO DO: SWITCH CASE ALL ERRORS
        this.error = err;
        alert(err);
      }
    });
    this.showAndroidTranslation = true;
    setTimeout(() => {
      if (window.getSelection) {
        window.getSelection()?.removeAllRanges();
      }
    }, 100);

  }


  getOS() {
    const newVariable: any = window.navigator;
    const userAgent = newVariable.userAgent,
        platform = newVariable?.userAgentData?.platform || newVariable.platform,
        macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPod'],
        ipadOsPlatforms = ['iPad'];
  
    if (macosPlatforms.indexOf(platform) !== -1) {
      this.OS = 'MacOS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      this.OS = 'iOS';
    } else if (ipadOsPlatforms.indexOf(platform) !== -1) {
      this.OS = 'ipadOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      this.OS = 'Windows';
    } else if (/Android/.test(userAgent)) {
      this.OS = 'Android';
    } else if (/Linux/.test(platform)) {
      this.OS = 'Linux';
    }
  }


  closeTranslate() {
    if (window.getSelection) {
      window.getSelection()?.removeAllRanges();
    }
    this.translation = null;
    this.translated = null;
    this.androidTranslation = null;
    this.showAndroidTranslation = false;
  }

  seslendirMetin() {
    const speechSynthesis = window.speechSynthesis;
    for(let section of this.chapterData.contents){
      const soylem = new SpeechSynthesisUtterance(section.content);
      soylem.rate = .8;
      soylem.lang = 'en-US'; // Dil ayarı
      speechSynthesis.speak(soylem);
    }
  }

  speachText() {
    const speakSection = (index = 0) => {
      if (index >= this.chapterData.contents.length) return; // Tüm bölümler tamamlandı
  
      const section = this.chapterData.contents[index];
      const cumleler = section.content.split(/(?<=[.?!;])\s/);
      let cumleIndex = 0;
  
      const speakSentence = () => {
        if (cumleIndex >= cumleler.length) {
          speakSection(index + 1); // Bu bölüm tamamlandı, bir sonraki bölüme geç
          return;
        }
  
        const cumle = cumleler[cumleIndex];
        const soylem = new SpeechSynthesisUtterance(cumle);
        soylem.rate = .8;
        soylem.lang = 'en-US';
  
        soylem.onend = () => {
          setTimeout(() => {
            cumleIndex++;
            speakSentence(); // Bir sonraki cümleyi seslendir
          }, 500); // 500 milisaniye bekleyin
        };
  
        window.speechSynthesis.speak(soylem);
      };
  
      speakSentence(); // Bu bölümün ilk cümlesini seslendir
    };
  
    speakSection(); // İlk bölümü seslendir
  }
}
