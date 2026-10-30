import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { AuthApiService, AuthUser, LoginRequest } from "../api/auth.api.service";
import { JWTTokenService } from "./jwt-token.service";
import { LocalStorageService } from "./localstorage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private api = inject(AuthApiService);
  private tokens = inject(JWTTokenService);
  private storage = inject(LocalStorageService);
  private router = inject(Router);

  readonly user = signal<AuthUser | null>(this.storage.getData("user-data"));

  isAuthenticated(): boolean {
    return !!this.tokens.getAccessToken();
  }

  login(body: LoginRequest): Promise<void> {
    return new Promise((resolve, reject) => {
      this.api.login(body).subscribe({
        next: ({ token, user }) => {
          this.tokens.save(token);
          this.user.set(user);
          this.storage.saveData("user-data", user);
          resolve();
        },
        error: reject,
      });
    });
  }

  logOut(): void {
    const clear = () => {
      this.tokens.clear();
      this.user.set(null);
      this.storage.removeData("user-data");
      this.router.navigate(["/authentication"]);
    };
    this.api.logout().subscribe({ next: clear, error: clear });
  }
}
