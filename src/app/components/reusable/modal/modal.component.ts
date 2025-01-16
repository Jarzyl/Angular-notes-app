import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() isVisible = false; // Czy modal jest widoczny
  @Input() title = ''; // Opcjonalny tytuł modala
  @Output() isVisibleChange = new EventEmitter<boolean>(); // Event do dwukierunkowego bindowania widoczności

  close() {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }
}
