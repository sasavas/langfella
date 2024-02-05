import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input() title: any = "";
  @Input() description: any = "";
  @Input() Cta1: any = "";
  @Input() Cta2: any = "";
  @Input() Cta3: any = "";
  @Output() closingEvent = new EventEmitter<boolean>();

  close() {
		this.closingEvent.emit(true);
	}
}
