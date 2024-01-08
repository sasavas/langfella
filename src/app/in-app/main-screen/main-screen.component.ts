import { Component } from '@angular/core';
import { ReadingListItemComponent } from '../reading-list-item/reading-list-item.component';
import { LogoBasicComponent } from '../../logo-basic/logo-basic.component';
import { Article } from '../../models/articles';
import { ArticleService } from '../../services/articles.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [ReadingListItemComponent, LogoBasicComponent],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.scss',
})
export class MainScreenComponent {
  articles: Article[] = [];
  constructor(
    private articleService: ArticleService,
    private authService: AuthService
  ) {}

  title: string =
    'As Russia Strikes Ports, Ukraine’s Farmers Scramble to Keep Exporting';

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((response) => {
      this.articles = response;
    });
  }

  logout() {
    this.authService.logout();
  }
}
