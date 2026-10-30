import { inject, Injectable } from "@angular/core";
import { LocalStorageService } from "./localstorage.service";

@Injectable({
  providedIn: "root",
})
export class JWTTokenService {
  private localstorageService = inject(LocalStorageService);

  getAccessToken(): string | null {
    const token = this.localstorageService.getData("token");
    return typeof token === "string" && token ? token : null;
  }

  save(token: string) {
    this.localstorageService.saveData("token", token);
  }

  clear() {
    this.localstorageService.removeData("token");
  }
}
