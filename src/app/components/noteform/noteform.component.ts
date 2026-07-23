import { Component, OnDestroy } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../reusable/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of, Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-noteform',
  imports: [CommonModule, FormsModule, ModalComponent, MatSnackBarModule],
  standalone: true,
  templateUrl: './noteform.component.html',
  styleUrls: ['./noteform.component.scss'],
})
export class NoteformComponent implements OnDestroy {
  notes: any[] = [];
  title: string = '';
  content: string = '';
  selectedNote: any = null;
  isModalVisible: boolean = false;
  modalType: 'edit' | 'delete' = 'edit'; // Typ operacji w modal
  private subscriptions: Subscription[] = []; // Tablica subskrypcji

  constructor(private notesService: NotesService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    const subscription = this.notesService.getNotes().pipe(
      catchError((error: HttpErrorResponse) => {
        // Logowanie błędu (np. w konsoli lub zewnętrznym serwisie)
        console.error('Błąd podczas pobierania notatek:', error);

        // Powiadomienie użytkownika (np. za pomocą toastu)
        this.snackBar.open('Nie udało się pobrać notatek. Spróbuj ponownie później.', 'Zamknij', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        // Zwrot pustej listy jako fallback
        return of([]);
      })
    ).subscribe((data) => {
      this.notes = data;
    });

    // Dodanie subskrypcji do tablicy
    this.subscriptions.push(subscription);
  }

  addNote(): void {
    if (this.title && this.content) {
      const subscription = this.notesService.addNote(this.title, this.content).subscribe(() => {
        this.getNotes();
        this.title = '';
        this.content = '';
      });

      // Dodanie subskrypcji do tablicy
      this.subscriptions.push(subscription);
    }
  }

  deleteNote(): void {
    if (this.selectedNote?.id) {
      const subscription = this.notesService.deleteNote(this.selectedNote.id).subscribe(() => {
        this.getNotes();
        this.isModalVisible = false;
      });

      // Dodanie subskrypcji do tablicy
      this.subscriptions.push(subscription);
    }
  }

  openEditModal(note: any): void {
    this.modalType = 'edit';
    this.selectedNote = { ...note };
    this.isModalVisible = true;
  }

  openDeleteModal(note: any): void {
    this.modalType = 'delete';
    this.selectedNote = { ...note };
    this.isModalVisible = true;
  }

  saveNote(): void {
    if (this.selectedNote) {
      const subscription = this.notesService
        .updateNote(
          this.selectedNote.id,
          this.selectedNote.title,
          this.selectedNote.content,
        )
        .subscribe(() => {
          this.getNotes();
          this.isModalVisible = false;
        });

      // Dodanie subskrypcji do tablicy
      this.subscriptions.push(subscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
