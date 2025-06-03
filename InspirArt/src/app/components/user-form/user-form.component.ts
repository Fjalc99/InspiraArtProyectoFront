import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsuarioDto } from '../../interfaces/UsuarioDto';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
@Input() usuario: Partial<UsuarioDto> = {};
  @Output() guardar = new EventEmitter<{ usuario: Partial<UsuarioDto>, file: File | null }>();
  @Output() cancelar = new EventEmitter<void>();


  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  guardarUsuario() {
    this.guardar.emit({ usuario: this.usuario, file: this.selectedFile });
  }

  cancelarFormulario() {
    this.cancelar.emit();
  }

contrasenasIguales(): boolean {
  return this.usuario.password === this.usuario.verifyPassword;
}
  
}