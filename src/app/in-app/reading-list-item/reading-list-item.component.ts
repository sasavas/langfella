import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reading-list-item',
  standalone: true,
  imports: [],
  templateUrl: './reading-list-item.component.html',
  styleUrl: './reading-list-item.component.scss'
})
export class ReadingListItemComponent {
  @Input() title: string = "";
  @Input() type: number = 1;
  
}
