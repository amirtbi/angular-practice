import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  localStorage: Storage | null = null;

  constructor() {
    this.localStorage = window.localStorage;
  }

  saveData(key: string, data: unknown) {
    this.localStorage?.setItem(key, JSON.stringify(data));
  }

  removeData(key: string) {
    this.localStorage?.removeItem(key);
  }

  getData(key: string) {
    const raw = this.localStorage?.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
}
