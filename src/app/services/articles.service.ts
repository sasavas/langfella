import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, exhaustMap, Observable, take } from 'rxjs';
import { Article } from '../models/articles';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  listOfArticles = new BehaviorSubject<Article[]>(null);
  constructor(private http: HttpClient, private authService: AuthService) {}

  getArticles(): Observable<Article[]> {
    let request = {
      url: 'https://aldaci-langfella-api.azurewebsites.net/Articles',
    };
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.jwt}`,
        });
        return this.http.get<Article[]>(request.url, { headers: headers });
      })
    );
  }
}
