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
import serverConfig from "./service-config"

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private getArticlesUrl = `${serverConfig.baseUrl}/Articles` as const;
  private getLearnerArticlesUrl = `${serverConfig.baseUrl}/Learner/Articles` as const;
  private importEpubUrl = `${serverConfig.baseUrl}/Epub/importEpubBookFromFile` as const;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getArticles(): Observable<Article[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.token}`,
    });

    var request = {
      url: this.getArticlesUrl,
      headers: headers,
    };

    return this.http.get<Article[]>(request.url, { headers: request.headers });
  }

  getImportedArciles(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.token}`,
    });

    var request = {
      url: this.getLearnerArticlesUrl,
      headers: headers,
    };

    return this.http.get<Article[]>(request.url, { headers: request.headers });
  }

  importEpubFromFile(formData:any): Observable<any>{
    let headers = new HttpHeaders({
      //'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${this.authService.token}`,
    });

    var request = {
      url: this.importEpubUrl,
      headers: headers,
    };

    return this.http.post<any>(request.url, formData, { headers: request.headers });
  }

  getArticle(id: string): Observable<DetailedArticle> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.token}`,
    });

    var request = {
      url: `${this.getArticlesUrl}/${id}`,
      headers: headers,
    };

    return this.http.get<DetailedArticle>(request.url, {
      headers: request.headers,
    });
  }
}
