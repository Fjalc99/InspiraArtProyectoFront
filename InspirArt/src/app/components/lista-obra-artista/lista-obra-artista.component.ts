import { Component, OnInit } from '@angular/core';
import { CategoriaDto } from '../../interfaces/categoria/CategoriaDto';
import { ListaObraDto } from '../../interfaces/ListaObraDto';
import { ObraDto } from '../../interfaces/ObraDto';
import { CategoriasService } from '../../services/categorias.service';
import { FavoritosService } from '../../services/favoritos.service';
import { ObrasService } from '../../services/obras.service';

@Component({
  selector: 'app-lista-obra-artista',
  templateUrl: './lista-obra-artista.component.html',
  styleUrl: './lista-obra-artista.component.css'
})
export class ListaObraArtistaComponent implements OnInit {

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
  obraSeleccionada: ObraDto | null = null;
    mostrarDetalle = false;
    
    categorias: CategoriaDto[] = [];

  constructor(
      private obrasService: ObrasService,
      private categoriasService: CategoriasService,
   
    ) {}
  
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
        },
        error: (err) => console.error('Error cargando categorías', err)
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
        this.obraSeleccionada = {
          idObra: obra.idObra,
          nombre: obra.nombre,
          nombreArtista: obra.nombreAutor, 
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
  
  // ...código existente...
  
 
  
    getImageUrl(nombreArchivo?: string): string {
      if (!nombreArchivo) return 'assets/no-image.png';
      if (nombreArchivo.startsWith('http')) return nombreArchivo;
      return `http://localhost:8080/download/${nombreArchivo}`;
    }
}
