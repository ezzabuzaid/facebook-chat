import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalStorage {
  private storage = null;

  constructor() {
    try {
      this.storage = localStorage;
    } catch (error) {
    }
  }

  set(name: string, value: any) {
    this.storage.setItem(name, JSON.stringify(value));
  }

  get<T>(name: string): T {
    return JSON.parse(this.storage.getItem(name));
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

}

