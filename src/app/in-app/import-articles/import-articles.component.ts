import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-import-articles',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './import-articles.component.html',
  styleUrl: './import-articles.component.scss'
})
export class ImportArticlesComponent {
  test: any = "";

}
