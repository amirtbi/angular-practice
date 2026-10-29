import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";

export interface User {
  name: string;
  email: string;
  phoneNumber:string;
}

type UserCreation = User & {userId:number}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly user = signal<UserCreation | null>(null);
  router= inject(Router)

  login(user: User) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.user.set({ ...user, userId: 20 });
        resolve(undefined);
      }, 2000);
    });
  }

  logOut(){
    this.router.navigate(["/authentication"],{queryParams:{user:"amir"}})
    this.user.set(null)
    this.router.navigate(["/authentication"])
  }

  getUser(): UserCreation | null {
    return this.user();
  }
}
