import { Observable, map, delay } from 'rxjs';
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_API_URL } from '../../app.config';
import {Movie} from '../types/movie.type';
import {ApiResponse} from '../types/apiResponse.type';

@Injectable({
  providedIn: "root",
})
export class MovieService {
  private readonly baseUrl: string = inject(BASE_API_URL);

  private readonly http: HttpClient = inject(HttpClient);

  getMovies(): Observable<Movie[]> {
    return this.http.get<ApiResponse<Movie[]>>(`${this.baseUrl}/movies`)
      .pipe(delay(1000))
      .pipe(map((response) => response.data));
  }
}
