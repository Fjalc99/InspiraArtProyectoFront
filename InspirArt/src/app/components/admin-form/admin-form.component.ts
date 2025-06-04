import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdminDto } from '../../interfaces/AdminDto';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css'
})
export class AdminFormComponent {
@Input() admin: Partial<AdminDto> = {};
  @Output() guardar = new EventEmitter<{ admin: any, file: File | null }>();
  @Output() cancelar = new EventEmitter<void>();

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  guardarAdmin() {
    this.guardar.emit({ admin: this.admin, file: this.selectedFile });
  }

  cancelarFormulario() {
    this.cancelar.emit();
  }

 contrasenasIguales(): boolean {
    return this.admin.password === this.admin.verifyPassword; 

  }
}