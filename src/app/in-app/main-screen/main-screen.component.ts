import { Component } from '@angular/core';
import { ReadingListItemComponent } from '../reading-list-item/reading-list-item.component';
import { LogoBasicComponent } from '../../shared/components/logo-basic/logo-basic.component';
import { Article } from '../../shared/models/articles';
import { ArticleService } from '../../shared/services/articles.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ImportArticlesComponent } from '../import-articles/import-articles.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [ReadingListItemComponent, LogoBasicComponent, MatIconModule, ImportArticlesComponent, LoadingComponent],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.scss',
})
export class MainScreenComponent {
  uname: any = null;
  showImportArticle: boolean = false;
  articlesLibrary: Article[] = [];
  importedArticles: Article[] = [];
  continueReading: Article[] = []
  error: string = "";

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService
  ) {}

  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.articleService.getArticles().subscribe({
      next: (response) => {
        console.log(response);
        this.articlesLibrary = response;
        this.loading = false;
      },
      error: (err) => {
        //TO DO: SWITCH CASE ALL ERRORS
        this.error = err;
        alert(err);
        this.loading = false;
      }
    });

    this.articleService.getImportedArciles().subscribe({
      next: (response) => {
        console.log(response);
        this.importedArticles = response;
        this.loading = false;
      },
      error: (err) => {
        //TO DO: SWITCH CASE ALL ERRORS
        this.error = err;
        alert(err);
        this.loading = false;
      }
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
    this.authService.logout().subscribe({
      next: (response) => {
        this.router.navigate(['../../']);
      },
      error: (error) => {
        this.error = error;
        console.log(error);
      }
    })
  }

  closeDetail(newData: boolean) {
    this.showImportArticle = false
	}
}
