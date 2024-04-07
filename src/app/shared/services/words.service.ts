import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { exhaustMap, Observable, take } from 'rxjs';
  import { UserWord } from '../models/word';
  import { AuthService } from './auth.service';
  import serverConfig from "./service-config"
  
  @Injectable({
    providedIn: 'root',
  })
  export class WordsService {
    private wordsUrl = `${serverConfig.baseUrl}/Words` as const;

    constructor(private http: HttpClient, private authService: AuthService){}

    postWord(word: UserWord){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.token}`,
      });

      var request = {
        url: `${this.wordsUrl}`,
        headers: headers,
      };
  
      return this.http.post<any>(request.url, word, {
        headers: request.headers,
      });
  
    }
    
    getWords(){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.token}`,
      });

      var request = {
        url: `${this.wordsUrl}`,
        headers: headers,
      };

      return this.http.get<any>(request.url, {
        headers: request.headers,
      });
    }

    deleteWord(id:string){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.token}`,
      });

      var request = {
        url: `${this.wordsUrl}`,
        headers: headers,
      };

      return this.http.delete<any>(request.url+"/"+id, {
        headers: request.headers,
      });
    }
    
  }