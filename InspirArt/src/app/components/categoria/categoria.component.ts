import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { CategoriaDto } from '../../interfaces/categoria/CategoriaDto';
import { CreateCategoriaDto } from '../../interfaces/categoria/CreateCategoriaDto';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { EditCategoriaDto } from '../../interfaces/categoria/EditCategoriaDto';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
})
export class CategoriaComponent implements OnInit {
  categorias: CategoriaDto[] = [];
  page = 0;
  size = 10;
  totalPages = 0;

  mostrarFormulario = false;
  categoriaSeleccionada: Partial<CategoriaDto> = { nombre: '' };
  esEdicion = false;
 



  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  async loadCategorias() {
    try {
      const data: any = await firstValueFrom(
        this.categoriasService.getCategorias(this.page, this.size)
      );
      this.categorias = data.content ?? data;
      this.totalPages = data.totalPages ?? 1;
    } catch (error) {
      console.error('Error fetching categorias:', error);
      this.categorias = [];
      this.totalPages = 0;
    }
  }

  editarCategoria(categoria: CategoriaDto) {
  this.categoriaSeleccionada = { ...categoria };
  this.esEdicion = true;
  this.mostrarFormulario = true;

}

aniadirCategoria() {
  this.categoriaSeleccionada = { nombre: '' };
  this.esEdicion = false;
  this.mostrarFormulario = true;

}

  onGuardarCategoria(categoria: Partial<CategoriaDto>) {
  if (this.esEdicion && categoria.idCategoria && categoria.nombre) {
    const dto: EditCategoriaDto = { nombreCategoria: categoria.nombre };
    this.categoriasService.editarCategoria(categoria.idCategoria, dto).subscribe({
      next: () => {
        this.mostrarFormulario = false;
        this.categoriaSeleccionada = { nombre: '' };
        this.loadCategorias();
      },
      error: (error) => {
        console.error('Error editando la categoría:', error);
      }
    });
  } else if (categoria.nombre) {
  const nuevaCategoria: CreateCategoriaDto = { nombreCategoria: categoria.nombre };
  this.categoriasService.crearCategoria(nuevaCategoria).subscribe({
    next: () => {
      this.mostrarFormulario = false;
      this.categoriaSeleccionada = { nombre: '' };
      this.loadCategorias();
    },
    error: (error) => {
      console.error('Error creando la categoría:', error);
    }
  });
}
}

  eliminarCategoria(idCategoria: string) {
    if (!idCategoria) return;
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      this.categoriasService.eliminarCategoria(idCategoria).subscribe({
        next: () => this.loadCategorias(),
        error: (error) => console.error('Error eliminando la categoría:', error)
      });
    }
  }

  onCancelarFormulario() {
    this.mostrarFormulario = false;
    this.categoriaSeleccionada = { nombre: '' };
  }


  verDetalleCategoria(categoria: CategoriaDto) {
  this.categoriaSeleccionada = { ...categoria };
  this.esEdicion = false;
  this.mostrarFormulario = true;
 
}

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.loadCategorias();
    }
  }
}