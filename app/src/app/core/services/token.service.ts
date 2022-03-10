import { Injectable } from '@angular/core';

const TOKEN_KEY = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  readonly tokenKey = TOKEN_KEY;

  removeToken(): void {
    window.sessionStorage.clear();
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(this.tokenKey);
    window.sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string {
    return sessionStorage.getItem(this.tokenKey) as string;
  }
}
