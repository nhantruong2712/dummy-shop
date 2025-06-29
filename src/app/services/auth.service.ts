import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse, LoginRequest } from '../models/user.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private tokenSubject = new BehaviorSubject<string | null>(this.getStoredToken());
  
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        this.setToken(response.accessToken);
      })
    );
  }

  logout(): void {
    this.clearToken();
  }

  private setToken(token: string): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', token);
      }
    } catch (e) {
      console.warn('Failed to store token in localStorage', e);
    }
    this.tokenSubject.next(token);
  }

  private clearToken(): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
      }
    } catch (e) {
      console.warn('Failed to remove token from localStorage', e);
    }
    this.tokenSubject.next(null);
  }

  private getStoredToken(): string | null {
    try {
      return typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }

  getToken(): string | null {
    return this.getStoredToken();
  }
} 