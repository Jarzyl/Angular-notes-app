import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import * as jwt from 'jwt-decode';
import { API_BASE_URL } from '../config/api.config';


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
  constructor(private http: HttpClient) {}

  // Register a user
  register(registerData: RegisterData): Observable<any> {
    return this.http.post(`${API_BASE_URL}/users/register`, registerData);
  }

  // Log in a user
  login(loginData: LoginData): Observable<any> {
    return this.http.post(`${API_BASE_URL}/auth/login`, loginData).pipe(
      tap((response: any) => {
        if (response?.accessToken) {
          this.saveToken(response.accessToken); // Save the token in localStorage
        }
      })
    );
  }
  

  // Save the token to localStorage after a successful login
  saveToken(token: string): void {
    console.log('Saving token:', token); // Log the token before saving it
    localStorage.setItem('token', token);
  }

  // Retrieve the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Decode the token and extract the userId
  getUserIdFromToken(token: string): number {
    try {
      const decoded: any = jwt.jwtDecode(token); // Decode the token
      return decoded.sub; // Assume the userId is stored in the token
    } catch (error) {
      console.error('Token decode error', error);
      return 1;
    }
  }

  // Log out the user
  logout(): void {
    localStorage.removeItem('token');
  }
}
