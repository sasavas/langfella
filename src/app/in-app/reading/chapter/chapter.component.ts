import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LogoBasicComponent } from '../../../logo-basic/logo-basic.component';
import $ from 'jquery';
import { TranslateDialogComponent } from '../../translate-dialog/translate-dialog.component';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [LogoBasicComponent, TranslateDialogComponent],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss'
})
export class ChapterComponent {
  @Input() chapterData: any;
  @Output() closingEvent = new EventEmitter<boolean>();

  translation: any = null;

  close() {
		this.closingEvent.emit(true);
    console.log("selami")
	}
  

  ngOnInit(){

  }
  
  ngAfterViewInit(){

    // $(".lang-cont").each(function(){
    //   this.addEventListener('contextmenu', function(e) {
    //     e.preventDefault();
    //   });
    // });

    $('.lang-cont').on("click touchstart", (e) => {
      let s = window.getSelection();
      if (s && s.anchorNode && s.toString().length > 0) {
          let range = s.getRangeAt(0);
          let node: any = s.anchorNode;
          let startOffset = range.startOffset;
          let endOffset = range.endOffset;
          let startNode: any = node;
          let endNode: any = node;
          
          // Find start node and offset
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
          
          // Find end node and offset
          while (endOffset < node.textContent.length && node.textContent[endOffset] != ' ') {
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
          
          // Create new range and select it
          let newRange = document.createRange();
          newRange.setStart(startNode, startOffset);
          newRange.setEnd(endNode, endOffset);
          s.removeAllRanges();
          s.addRange(newRange);
          
          // Alert selected text
          let str = newRange.toString().trim().replace(/[.,;"]/g, "");

          this.translation = str;


      }
    });
  }




  closeTranslate(){
    if(window.getSelection){
      window.getSelection()?.removeAllRanges();
    }
    this.translation = null;
  }
}
