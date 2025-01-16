import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  // Sprawdzenie, czy użytkownik jest zalogowany
  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.getToken() !== null;
  }

  moveToTheLogin(): void {
    this.router.navigate(['/login']);
  }

  moveToTheHome(): void {
    this.router.navigate(['/']);
  }

  // Funkcja do wylogowania
  logout(): void {
    this.authService.logout();
    this.checkLoginStatus();
    this.router.navigate(['/']); // Przekierowanie na stronę główną po wylogowaniu
  }
}
