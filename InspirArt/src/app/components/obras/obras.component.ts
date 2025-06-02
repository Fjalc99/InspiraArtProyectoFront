import { Component, OnInit } from '@angular/core';
import { ObrasService } from '../../services/obras.service';
import { ObraDto } from '../../interfaces/ObraDto';
import { ListaObraDto } from '../../interfaces/ListaObraDto';
import { CategoriaDto } from '../../interfaces/categoria/CategoriaDto';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrl: './obras.component.css'
})
export class ObrasComponent implements OnInit {

  obras: ListaObraDto[] = [];
  page = 0;
  size = 10;
  totalPages = 0;
  filtros: { [key: string]: string } = {
    titulo: '',
    artista: '',
    fechaCreacion: '',
    estilo: ''
  };

  
  mostrarDetalle = false;
  mostrarFormulario = false;
  esEdicion = false;
  obraSeleccionada: Partial<ObraDto> = {};
categorias: CategoriaDto[] = [];

  constructor(private obrasService: ObrasService, private categoriasService: CategoriasService) { }

  ngOnInit(): void {
  this.loadObras();
  this.loadCategorias();
}

  loadObras() {
    this.obrasService.getObras(this.filtros, this.page, this.size).subscribe({
      next: (data: any) => {
        this.obras = data.content;
        this.totalPages = data.totalPages;
      },
      error: (error) => {
        console.error('Error al cargar obras:', error);
        this.obras = [];
        this.totalPages = 0;
      }
    });
  }

 loadCategorias() {
  this.categoriasService.getCategorias().subscribe({
    next: (data) => {
      if (data && Array.isArray((data as any).content)) {
        this.categorias = (data as any).content;
      } else if (Array.isArray(data)) {
        this.categorias = data;
      } else {
        this.categorias = [];
      }
      console.log('Categorías cargadas:', this.categorias);
    },
    error: (err) => console.error('Error cargando categorías', err)
  });
}

  onGuardarObra(event: { obra: Partial<ObraDto>; file: File | null; }) {
  const { obra, file } = event;
  const formData = new FormData();

  
  formData.append('createObraDto', JSON.stringify({
    nombre: obra.nombre,
    fechaSubida: obra.fechaSubida,
    nombreCategoria: typeof obra.categoria === 'object' && obra.categoria !== null
      ? obra.categoria.nombre
      : obra.categoria
  }));

  if (file) {
    formData.append('file', file);
  }

  this.obrasService.crearObra(formData).subscribe(() => {
    this.cerrarFormulario();
    this.loadObras();
  });
}

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.loadObras();
    }
  }

  aplicarFiltros() {
    this.page = 0;
    this.loadObras();
  }

  verDetalleObra(obra: ListaObraDto) {
  // Si el campo es nombreAutor en ListaObraDto, conviértelo:
  this.obraSeleccionada = {
    ...obra,
    nombreArtista: (obra as any).nombreArtista ?? (obra as any).nombreAutor ?? ''
  };
  console.log('Obra seleccionada:', this.obraSeleccionada);
  this.mostrarDetalle = true;
  this.mostrarFormulario = false;
  this.esEdicion = false;
}
/*
  editarObra(obra: ListaObraDto) {
    this.obraSeleccionada = { ...obra };
    this.mostrarFormulario = true;
    this.mostrarDetalle = false;
    this.esEdicion = true;
  } */

  aniadirObra() {
  this.loadCategorias();
  this.obraSeleccionada = {};
  this.mostrarFormulario = true;
  this.mostrarDetalle = false;
  this.esEdicion = false;
}

  eliminarObra(idObra: string) {
    if (confirm('¿Seguro que quieres eliminar esta obra?')) {
      this.obrasService.eliminarObra(idObra).subscribe({
        next: () => this.loadObras(),
        error: (err) => console.error('Error eliminando obra:', err)
      });
    }
  }

  cerrarDetalle() {
    this.mostrarDetalle = false;
    this.obraSeleccionada = {};
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.obraSeleccionada = {};
    this.esEdicion = false;
  }

  getImageUrl(nombreArchivo: string | undefined): string {
  if (!nombreArchivo) return 'assets/no-image.png';
  if (nombreArchivo.startsWith('http')) return nombreArchivo;
  return `http://localhost:8080/download/${nombreArchivo}`;
}

get Math() {
  return Math;
}
}