import { Component } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-noteform',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './noteform.component.html',
  styleUrl: './noteform.component.scss'
})
export class NoteformComponent {
  notes: any[] = [];
  title: string = '';
  content: string = '';

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.notesService.getNotes().subscribe((data) => {
      this.notes = data;
    });
  }

  addNote(): void {
    if (this.title && this.content) {
      this.notesService.addNote(this.title, this.content).subscribe(() => {
        this.getNotes(); // Odświeżamy listę notatek
        this.title = '';
        this.content = '';
      });
    }
  }
}

