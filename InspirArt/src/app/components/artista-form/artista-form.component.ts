import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArtistaDto } from '../../interfaces/ArtistaDto';

@Component({
  selector: 'app-artista-form',
  templateUrl: './artista-form.component.html',
  styleUrl: './artista-form.component.css'
})
export class ArtistaFormComponent {

 @Input() artista: Partial<ArtistaDto> = {};
  @Output() guardar = new EventEmitter<{ artista: any, file: File | null }>();
  @Output() cancelar = new EventEmitter<void>();

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  guardarArtista() {
    this.guardar.emit({ artista: this.artista, file: this.selectedFile });
  }

  cancelarFormulario() {
    this.cancelar.emit();
  }

  contrasenasIguales(): boolean {
    return this.artista.password === this.artista.verifyPassword;
  }
}
