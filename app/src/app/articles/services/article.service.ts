import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_API_URL} from '../../app.config';
import {map, Observable, tap} from 'rxjs';
import {ApiResponse} from '../../movies/types/apiResponse.type';

export type Article = {
  id: string | number;
  title: string;
  desc: string;
  author: string;
  imgPath: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  #baseUrl: string = inject(BASE_API_URL);
  #http: HttpClient = inject(HttpClient);

  getArticles(): Observable<Article[]> {
    return this.#http.get<ApiResponse<Article[]>>(this.#baseUrl + '/articles')
      .pipe(tap((response) => {
        console.log(response);
      }))
      .pipe(map(articles => articles.data));
  }

  getArticle(id: number): Observable<Article> {
    return this.#http.get<ApiResponse<Article>>(`${this.#baseUrl}/articles/${id}`)
      .pipe(tap((response) => {
        console.log(response);
      }))
      .pipe(map(response => {
        if (!response.data) {
          throw new Error('Could not get article');
        }

        return response.data;
      }));
  }
}
