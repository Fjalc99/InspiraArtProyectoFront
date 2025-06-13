import { Component, EventEmitter, Input, Output,  OnInit } from '@angular/core';
import { ObraDto } from '../../interfaces/ObraDto';
import { CategoriaDto } from '../../interfaces/categoria/CategoriaDto';
import { CategoriasService } from '../../services/categorias.service';
import { CreateObraDto } from '../../interfaces/CreateObraDto';
import { ObrasService } from '../../services/obras.service';

@Component({
  selector: 'app-obras-form',
  templateUrl: './obra-form.component.html',
  styleUrl: './obra-form.component.css'
})
export class ObrasFormComponent implements OnInit{

   @Output() creada = new EventEmitter<any>();
  @Output() cancelarForm = new EventEmitter<void>();

  obra: CreateObraDto = {
    nombre: '',
    nombreCategoria: ''
  };
  selectedFile: File | null = null;
  categorias: CategoriaDto[] = [];

  constructor(private crearObraService: ObrasService, private categoriaService: CategoriasService) {}

  ngOnInit(): void {
     this.categoriaService.getCategoriasForm().subscribe(resp => this.categorias = resp);
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  crearObra(): void {
    if (this.obra.nombre && this.obra.nombreCategoria && this.selectedFile) {
      this.crearObraService.crearObra(
        {
          nombre: this.obra.nombre,
          nombreCategoria: this.obra.nombreCategoria
        },
        this.selectedFile
      ).subscribe(nuevaObra => {
        this.creada.emit(nuevaObra);
      });
    }
  }

  cancelar(): void {
    this.cancelarForm.emit();
  }
}
