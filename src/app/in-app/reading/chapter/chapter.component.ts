import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LogoBasicComponent } from '../../../logo-basic/logo-basic.component';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [LogoBasicComponent],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss'
})
export class ChapterComponent {
  @Input() chapterData: any;
  @Output() closingEvent = new EventEmitter<boolean>();

  close() {
		this.closingEvent.emit(true);
    console.log("selami")
	}
}
