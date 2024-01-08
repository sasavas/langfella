import { Component, Input } from '@angular/core';
import { DetailedArticle } from '../../models/articles';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/articles.service';

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.scss',
})
export class ReadingComponent {
  articleId: string = '';
  chapterId: string = '';

  constructor(
    private activetedRoute: ActivatedRoute,
    private articleService: ArticleService
  ) {}
  @Input() article: DetailedArticle = {};

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((response) => {
      console.log(response['articleId']);
      this.articleService
        .getArticle(response['articleId'])
        .subscribe((response) => {
          this.article = response;
        });
    });
  }
}
