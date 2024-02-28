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

	ngOnChanges(changes: SimpleChanges) {
		if (changes.translatedText) {
      console.log(this.translatedText);
		}
	}


  close() {
		this.closingEvent.emit(true);
	}
}
