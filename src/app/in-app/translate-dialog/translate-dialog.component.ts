import { Component, EventEmitter, Input, Output } from '@angular/core';
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


  close() {
		this.closingEvent.emit(true);
	}
}
