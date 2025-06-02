import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CategoriaDto } from '../../interfaces/categoria/CategoriaDto';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent implements OnChanges {

  @Input() categoria: Partial<CategoriaDto> = { nombre: '' };
  @Input() esEdicion: boolean = false;
  @Output() guardar = new EventEmitter<CategoriaDto>();
  @Output() cancelar = new EventEmitter<void>();
  

  categoriaLocal: Partial<CategoriaDto> = { nombre: '' };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoria'] && this.categoria) {
      this.categoriaLocal = { 
        idCategoria: this.categoria.idCategoria,
        nombre: this.categoria.nombre ?? ''
      };
    }
  }

  onGuardar() {
    this.guardar.emit(this.categoriaLocal as CategoriaDto);
  }

  onCancelar() {
    this.cancelar.emit();
  }
}