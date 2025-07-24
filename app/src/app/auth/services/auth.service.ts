import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_API_URL} from '../../app.config';
import { BehaviorSubject, map } from 'rxjs';
import {ApiResponse} from '../../movies/types/apiResponse.type';

export type User = {
  email: string;
}

export type LoginPayload = {
  email: string;
  password: string;
}

type AuthResponse = {
  token: string;
} & User;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  static STORAGE_KEY: string = "user";

  private baseUrl = inject(BASE_API_URL);
  private http = inject(HttpClient);

  private u = new BehaviorSubject<boolean>(false);
  u$ = this.u.asObservable();

  login(payload: LoginPayload) {
    this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/login`, payload)
      .pipe(map((response) => response.data))
      .subscribe({
        next: (res) => {
          localStorage.setItem(AuthService.STORAGE_KEY, JSON.stringify(res));
          this.u.next(true);
        }, error: (err) => {
          localStorage.removeItem(AuthService.STORAGE_KEY);
          this.u.next(false);
        }
      });
  }

  logout() {
    localStorage.removeItem(AuthService.STORAGE_KEY);
    this.u.next(false);
  }

  isAuthenticated(): boolean {
    let isAuthenticated = false;

    try {
      const { token } = JSON.parse(localStorage.getItem(AuthService.STORAGE_KEY) || "");

      if (token) {
        isAuthenticated = true;
      }
    } catch (e) {
      isAuthenticated = false;

      localStorage.removeItem(AuthService.STORAGE_KEY);
    }

    if (this.u.getValue() !== isAuthenticated) {
      this.u.next(isAuthenticated);
    }

    return isAuthenticated;
  }
}
