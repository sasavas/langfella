import { Component, Input } from '@angular/core';
import { Article } from '../../shared/models/articles';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reading-list-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './reading-list-item.component.html',
  styleUrl: './reading-list-item.component.scss',
})
export class ReadingListItemComponent {
  @Input() article: Article = {};
}
