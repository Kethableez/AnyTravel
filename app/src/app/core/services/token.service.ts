import { Injectable } from '@angular/core';

const TOKEN_KEY = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  readonly tokenKey = TOKEN_KEY;

  removeToken(): void {
    window.localStorage.removeItem(this.tokenKey);
  }

  saveToken(token: string): void {
    window.localStorage.removeItem(this.tokenKey);
    window.localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) as string;
  }
}
