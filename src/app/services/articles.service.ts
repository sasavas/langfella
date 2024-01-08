import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { Article, DetailedArticle } from '../models/articles';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private url = 'https://aldaci-langfella-api.azurewebsites.net/Articles';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getArticles(): Observable<Article[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.token}`,
    });

    var request = {
      url: this.url,
      headers: headers,
    };

    return this.http.get<Article[]>(request.url, { headers: request.headers });
  }

  getArticle(id: string): Observable<DetailedArticle> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.token}`,
    });

    var request = {
      url: this.url + '/' + id,
      headers: headers,
    };

    return this.http.get<DetailedArticle>(request.url, {
      headers: request.headers,
    });
  }
}
