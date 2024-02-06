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
  private epubUrl = 'https://aldaci-langfella-api.azurewebsites.net/Epub/importEpubBookFromFile'

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

  importEpubFromFile(file:any): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${this.authService.token}`,
    });

    var request = {
      url: this.epubUrl,
      headers: headers,
    };

    return this.http.post<any>(request.url, file, { headers: request.headers });
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
