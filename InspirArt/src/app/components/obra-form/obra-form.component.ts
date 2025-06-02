import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ObraDto } from '../../interfaces/ObraDto';
import { CategoriaDto } from '../../interfaces/categoria/CategoriaDto';

@Component({
  selector: 'app-obras-form',
  templateUrl: './obra-form.component.html',
  styleUrl: './obra-form.component.css'
})
export class ObrasFormComponent implements OnChanges {
  @Input() obra: Partial<ObraDto> = {};
  @Input() categorias: CategoriaDto[] = [];
  @Output() guardar = new EventEmitter<{ obra: Partial<ObraDto>, file: File | null }>();
  @Output() cancelar = new EventEmitter<void>();

  obraLocal: Partial<ObraDto> = {};
  selectedFile: File | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['obra'] && this.obra) {
      this.obraLocal = { ...this.obra };
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
      alert('Solo se permiten archivos de imagen.');
    }
  }

  onGuardar() {
    if (this.selectedFile) {
      this.guardar.emit({ obra: this.obraLocal, file: this.selectedFile });
    }
  }

  onCancelar() {
    this.cancelar.emit();
  }
}