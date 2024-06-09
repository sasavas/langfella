import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { LogoBasicComponent } from '../../../shared/components/logo-basic/logo-basic.component';
import { TranslateDialogComponent } from '../../translate-dialog/translate-dialog.component';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../shared/services/translations.service';
import { MatIconModule } from '@angular/material/icon';
import { UserWord } from '../../../shared/models/word';
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

  @ViewChildren('sectionRef') sections: QueryList<ElementRef> | undefined;
  currentSectionIndex: number | null = null;

  translation: any = null;
  translated: any = null;
  userWord: UserWord = {};
  clickActive: boolean = false;
  OS: any = null
  error: any;

  translationDialog: boolean = false;
  playingAudio: boolean = false;

  androidTranslation: any = null;
  maxCharAndroid: boolean = false;
  showAndroidTranslation: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private translationService: TranslationService
  ) {}

  close() {
    this.closingEvent.emit(true);
    window.speechSynthesis.cancel();
    console.log('selami');
  }

  ngOnInit() {
    this.getOS();
    if(this.OS == 'Android'){
      document.addEventListener('selectionchange', this.handleSelectionChange);
    }
    for(let section of this.chapterData.contents){
        section.content = section.content.replace(/\n/g,' ')
    }
  }

  ngOnDestroy() {
    // Event listener'ı temizle
    document.removeEventListener('selectionchange', this.handleSelectionChange);

    this.translation = null;
    this.translated = null;
    this.userWord = {};
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
          this.translation = s.toString().replace(/["“”]/g, '');
          this.translationService.getTranslation(this.translation, this.sourceLanguage, "tr").subscribe({
            next: (response) => {
              console.log(response);
              this.translated = response;
              this.userWord = {
                text: this.translation,
                sourceLanguageCode: this.sourceLanguage,
                targetLanguageCode: "tr",
                translations: this.translated,
                exampleSentence: this.translation,
                familiarityLevel: "New",
              }
            },
            error: (err) => {
              //TO DO: SWITCH CASE ALL ERRORS
              this.error = err.detail;
              alert(this.error);
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
          this.translation = str.replace(/["“”]/g, '');
          this.translationService.getTranslation(this.translation, this.sourceLanguage, "tr").subscribe({
            next: (response) => {
              this.translated = response;
              this.userWord = {
                text: this.translation,
                sourceLanguageCode: this.sourceLanguage,
                targetLanguageCode: "tr",
                translations: this.translated,
                exampleSentence: this.translation,
                familiarityLevel: "New",
              }
            },
            error: (err) => {
              //TO DO: SWITCH CASE ALL ERRORS
              this.error = err.detail;
              alert(this.error);
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
        const selectedText = selection.toString().replace(/["“”]/g, '');
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
        this.userWord = {
          text: this.translation,
          sourceLanguageCode: this.sourceLanguage,
          targetLanguageCode: "tr",
          translations: this.translated,
          exampleSentence: this.translation,
          familiarityLevel: "New",
        }
      },
      error: (err) => {
        //TO DO: SWITCH CASE ALL ERRORS
        this.error = err.detail;
        alert(this.error);
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
    this.userWord = {};
    this.androidTranslation = null;
    this.showAndroidTranslation = false;
  }

  stopSpeakText(){
    window.speechSynthesis.pause();
    this.playingAudio = false;
  }

  speakText(): void {
    const speakSection = (index = 0) => {
      if (index >= this.chapterData.contents.length) {
        this.currentSectionIndex = null;
        this.playingAudio = false
        return;
      }
      this.playingAudio = true
      this.currentSectionIndex = index;
      this.scrollToCurrentSection();
      this.cdRef.detectChanges(); // Değişiklik algılama döngüsünü manuel olarak tetikleyin

      const section = this.chapterData.contents[index];
      const sentences = section.content.split(/(?<=[.?!;])\s/);
      let sentenceIndex = 0;

      const speakSentence = () => {
        if (sentenceIndex >= sentences.length) {
          speakSection(index + 1);
          return;
        }

        const sentence = sentences[sentenceIndex];
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.lang = 'en-US';
        utterance.rate = .8;
        utterance.lang = 'en-US'; // Dil ayarı

        utterance.onend = () => {
          setTimeout(() => {
            sentenceIndex++;
            speakSentence();
          }, 500);
        };

        window.speechSynthesis.speak(utterance);
      };

      speakSentence();
    };

    speakSection();
  }

  scrollToCurrentSection(): void {
    if (this.currentSectionIndex !== null) {
      const sectionElement = this.sections?.toArray()[this.currentSectionIndex].nativeElement;
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}
