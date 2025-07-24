import {computed, inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_API_URL} from '../../app.config';
import {map, Observable} from 'rxjs';
import {ApiResponse} from '../../movies/types/apiResponse.type';

export type LoginPayload = {
  email: string;
  password: string;
}

type AuthState = {
  token: string;
  logginError: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  static STORAGE_KEY: string = "user";

  private baseUrl = inject(BASE_API_URL);
  private http = inject(HttpClient);

  #authState = signal<AuthState>({
    token: "",
    logginError: false,
  });

  loginError = computed(() => this.#authState().logginError);
  token = computed(() => this.#authState().token);

  login(payload: LoginPayload): Observable<void> {
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}/login`, payload)
      .pipe(map((response) => {
        let code = response.code || 400;

        if (typeof code === "string") {
          code = Number.parseInt(code);
        }

        if (code === 200 && code < 300) {
          localStorage.setItem(AuthService.STORAGE_KEY, response.data);
          this.#authState.set({logginError: false, token: response.data});

          return;
        }

        localStorage.removeItem(AuthService.STORAGE_KEY);
        this.#authState.set({logginError: true, token: ""});

        throw new Error();
      }));
  }

  logout() {
    localStorage.removeItem(AuthService.STORAGE_KEY);
    this.#authState.set({logginError: false, token: ""});
  }

  authenticate() {
    console.log("authenticate")

    const authState: AuthState = {
      token: "",
      logginError: false,
    }

    try {
      const token = localStorage.getItem(AuthService.STORAGE_KEY) || "";

      if (token) {
        authState.token = token;
      }
    } catch (error) {
      authState.logginError = true;
    }

    this.#authState.set(authState);
  }
}
