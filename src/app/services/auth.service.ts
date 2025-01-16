import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = "http://localhost:3000/api"; // Adres API

  constructor(private http: HttpClient) {}

  // Rejestracja użytkownika
  register(registerData: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, registerData);
  }

  // Logowanie użytkownika
  login(loginData: LoginData): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, loginData);
  }

  // Metoda do zapisywania tokenu w localStorage po udanym logowaniu
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Metoda do pobierania tokenu z localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Metoda do wylogowania
  logout(): void {
    localStorage.removeItem('token');
  }
}
