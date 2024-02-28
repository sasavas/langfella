import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LogoBasicComponent } from '../../../shared/components/logo-basic/logo-basic.component';
import { TranslateDialogComponent } from '../../translate-dialog/translate-dialog.component';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../shared/services/translations.service';
@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [LogoBasicComponent, TranslateDialogComponent, CommonModule],
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

  constructor(
    private translationService: TranslationService
  ) {}

  close() {
    this.closingEvent.emit(true);
    console.log('selami');
  }

  ngOnInit() {
    this.getOS();
    if(this.OS == 'Android' || this.OS == 'iOS'){
      document.addEventListener('selectionchange', this.handleSelectionChange);
    }
  }

  ngOnDestroy() {
    // Event listener'ı temizle
    document.removeEventListener('selectionchange', this.handleSelectionChange);
  }


  test(){
    
  }

  ngAfterViewInıt(){
  }

  getClickedWord(event: MouseEvent | TouchEvent): void {
    let s = window.getSelection();

     if (s && s.anchorNode && s.toString().length > 0) {
       if (event instanceof TouchEvent && event.changedTouches.length > 0) {
          // alert("touch");
          this.translation = s.toString();
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
      const selectedText = selection.toString();
      this.translation = selectedText;
      // Uyarı yerine, seçilen metni işlemek için kendi kodunuzu buraya ekleyin.
    }else{
      this.translation = null;
    }
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
  }
}
