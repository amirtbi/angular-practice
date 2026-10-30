import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface LoginRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthUser {
  userId: number;
  username: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

@Injectable({
  providedIn: "root",
})
export class AuthApiService {
  private http = inject(HttpClient);

  login(body: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>("/login", body);
  }

  logout(): Observable<void> {
    return this.http.post<void>("/logout", null);
  }
}
