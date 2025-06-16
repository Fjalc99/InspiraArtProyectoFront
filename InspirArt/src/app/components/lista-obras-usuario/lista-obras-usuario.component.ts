import { Component, OnInit } from '@angular/core';
import { ObrasService } from '../../services/obras.service';
import { ListaObraDto } from '../../interfaces/ListaObraDto';
import { CategoriaDto } from '../../interfaces/categoria/CategoriaDto';
import { ObraDto } from '../../interfaces/ObraDto';
import { CategoriasService } from '../../services/categorias.service';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-lista-obras-usuario',
  templateUrl: './lista-obras-usuario.component.html',
  styleUrls: ['./lista-obras-usuario.component.css']
})
export class ListaObrasUsuarioComponent implements OnInit {
  obras: ListaObraDto[] = [];
  page = 0;
  size = 9;
  totalPages = 0;
  filtros: { [key: string]: string } = {
  nombreObra: '',
  autor: '',
  categoria: '',
  valoracionMedia: ''
};
obraSeleccionada: ObraDto | null = null;
  mostrarDetalle = false;
  
 categorias: CategoriaDto[] = [];

  constructor(
    private obrasService: ObrasService,
    private categoriasService: CategoriasService,
    private favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {
    this.loadObras();
    this.loadCategorias();
    this.favoritosService.cargarFavoritos();
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
   this.categoriasService.getCategoriasForm().subscribe(resp => this.categorias = resp);
  }

  
  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.loadObras();
    }
  }

aplicarFiltros() {
    this.page = 0;

    const filtrosBackend: { [key: string]: string } = {};

    if (this.filtros['titulo'])
      filtrosBackend['nombreObra'] = this.filtros['titulo'];
    if (this.filtros['artista'])
      filtrosBackend['autor'] = this.filtros['artista'];
    if (this.filtros['estilo'])
      filtrosBackend['categoria'] = this.filtros['estilo'];
    if (this.filtros['valoracionMedia'])
      filtrosBackend['valoracionMedia'] = this.filtros['valoracionMedia'];

    this.obrasService.getObras(filtrosBackend, this.page, this.size).subscribe({
      next: (data: any) => {
        this.obras = data.content;
        this.totalPages = data.totalPages;
      },
      error: (error) => {
        console.error('Error al cargar obras:', error);
        this.obras = [];
        this.totalPages = 0;
      },
    });
  }


        verDetalleObra(obra: ListaObraDto) {
      this.obraSeleccionada = {
        idObra: obra.idObra,
        nombre: obra.nombre,
        nombreAutor: obra.nombreAutor, 
        categoria: obra.categoria,
        fechaSubida: obra.fechaSubida,
        imagenObra: obra.imagenObra,
        mediaValoracion: obra.mediaValoracion,
        comentarios: obra.comentarios ?? [],
        valoraciones: obra.valoraciones ?? []
       
      };
      this.mostrarDetalle = true;
    }

  cerrarDetalle() {
  this.mostrarDetalle = false;
  this.obraSeleccionada = null;
  this.loadObras();
}



esFavorito(obra: ListaObraDto): boolean {
  return this.favoritosService.favoritos.some(f => f.obra.idObra === obra.idObra);
}

toggleFavorito(obra: ListaObraDto) {
  const fav = this.favoritosService.favoritos.find(f => f.obra.idObra === obra.idObra);
  if (fav) {
    this.favoritosService.eliminarFavorito(fav.id).subscribe(() => this.favoritosService.cargarFavoritos());
  } else {
    this.favoritosService.agregarFavorito(obra.idObra).subscribe(() => this.favoritosService.cargarFavoritos());
  }
}

  getImageUrl(nombreArchivo?: string): string {
    if (!nombreArchivo) return 'assets/no-image.png';

   
    const downloadIdx = nombreArchivo.indexOf('/download/https');
    if (downloadIdx !== -1) {
      const httpsIdx = nombreArchivo.indexOf('https', downloadIdx);
      if (httpsIdx !== -1) {
        return nombreArchivo.substring(httpsIdx);
      }
    }

    if (nombreArchivo.startsWith('http')) return nombreArchivo;
    return `http://localhost:8080/download/${nombreArchivo}`;
  }
}