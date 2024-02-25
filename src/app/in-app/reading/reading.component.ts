import { Component, Input } from '@angular/core';
import { DetailedArticle } from '../../shared/models/articles';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArticleService } from '../../shared/services/articles.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ChapterComponent } from './chapter/chapter.component';
import { LogoBasicComponent } from '../../shared/components/logo-basic/logo-basic.component';

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [LoadingComponent, ChapterComponent, LogoBasicComponent, RouterLink],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.scss',
})
export class ReadingComponent {
  articleId: string = '';
  chapterId: string = '';
  loading: boolean = false;
  currentChapter: any = null;
  lastroute: any = "";

  constructor(
    private activetedRoute: ActivatedRoute,
    private articleService: ArticleService
  ) {}
  @Input() article: DetailedArticle = {};

  ngOnInit() {
    this.loading = true;
    this.activetedRoute.params.subscribe((response1) => {
      console.log(response1['articleId']);
      if(this.lastroute !== response1['articleId']){
        this.articleService
        .getArticle(response1['articleId'])
        .subscribe((response) => {
          this.article = response;
          console.log(response);
          this.lastroute = response1['articleId'];
          this.loading = false;
        });
      }else{
        this.loading = false;
      }
    });
  }

  openChapter(chapter:any){
    this.currentChapter = chapter
    console.log(this.currentChapter);
    let container = document.getElementsByClassName('app_body')[0]
    container.scrollTop = 0;
  }

  closeChapter(){
		this.currentChapter = null;
	}
}
