import { Component } from '@angular/core';
import { ReadingListItemComponent } from '../reading-list-item/reading-list-item.component';
import { LogoBasicComponent } from '../../logo-basic/logo-basic.component';
import { Article } from '../../models/articles';
import { ArticleService } from '../../services/articles.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ImportArticlesComponent } from '../import-articles/import-articles.component';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [ReadingListItemComponent, LogoBasicComponent, MatIconModule, ImportArticlesComponent, LoadingComponent],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.scss',
})
export class MainScreenComponent {
  showImportArticle: boolean = false;
  articles: Article[] = [];
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService
  ) {}
  loading: boolean = false;
  title: string =
    'As Russia Strikes Ports, Ukraine’s Farmers Scramble to Keep Exporting';

  ngOnInit(): void {
    this.loading = true;
    this.articleService.getArticles().subscribe((response) => {
      console.log(response);
      this.articles = response;
      this.loading = false;
    });
  }

  toggleShowImportArticle(){
    if(this.showImportArticle == true){
      this.showImportArticle = false
    }else{
      this.showImportArticle = true
    }
  }

  goToArticle(id: any) {
    this.router.navigate(['app/read/' + id]);
  }

  logout() {
    this.authService.logout();
  }

  closeDetail(newData: boolean) {
    this.showImportArticle = false
	}
}
