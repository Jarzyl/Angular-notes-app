import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NoteformComponent } from './components/noteform/noteform.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NoteformComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-notes-app';
}
