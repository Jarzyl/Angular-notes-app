// src/app/notes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import AuthService to retrieve the token
import { API_BASE_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get all notes for the logged-in user
  getNotes(): Observable<any[]> {
    const token = this.authService.getToken(); // Read the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the authorization header

    return this.http.get<any[]>(`${API_BASE_URL}/notes`, { headers }); // Send the header with the request
  }

  // Add a new note
  addNote(title: string, content: string): Observable<any> {
    const token = this.authService.getToken(); // Read the token
    
    if (!token) {
      throw new Error('Token is missing'); // Throw an error if the token is missing
    }
  
    const userId = this.authService.getUserIdFromToken(token); // Read the userId from the token
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Send title, content, and userId in the request body
    return this.http.post<any>(`${API_BASE_URL}/notes`, { title, content, userId }, { headers });
  }
  

  // Delete a note
  deleteNote(id: number): Observable<void> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${API_BASE_URL}/notes/${id}`, { headers });
  }

  // Update a note
  updateNote(id: number, title: string, content: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${API_BASE_URL}/notes/${id}`, { title, content }, { headers });
  }
}
