import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { exhaustMap, Observable, take } from 'rxjs';
  import { Article, DetailedArticle } from '../models/articles';
  import { AuthService } from './auth.service';
  import serverConfig from "./service-config"
  
  @Injectable({
    providedIn: 'root',
  })
  export class TranslationService {
    private getArticlesUrl = `${serverConfig.baseUrl}/Articles` as const;
    private postTranslateUrl = `${serverConfig.baseUrl}/Translations/Translate` as const;
  
    constructor(private http: HttpClient, private authService: AuthService) {}
  

  
    getTranslation(text:string, source: string, target: string): Observable<any> {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.token}`,
      });
  
      var request = {
        url: `${this.postTranslateUrl}`,
        headers: headers,
      };

      let translate = {
        text,
        sourceLanguageCode: source,
        targetLanguageCode: target,
      }
  
      return this.http.post<any>(request.url, translate, {
        headers: request.headers,
      });
    }
  }
  