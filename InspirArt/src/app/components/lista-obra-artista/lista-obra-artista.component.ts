import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriaDto } from '../../interfaces/categoria/CategoriaDto';
import { ListaObraDto } from '../../interfaces/ListaObraDto';
import { ObraDto } from '../../interfaces/ObraDto';
import { CategoriasService } from '../../services/categorias.service';
import { ObrasService } from '../../services/obras.service';

@Component({
  selector: 'app-lista-obra-artista',
  templateUrl: './lista-obra-artista.component.html',
  styleUrl: './lista-obra-artista.component.css',
})
export class ListaObraArtistaComponent implements OnInit {
  obras: ListaObraDto[] = [];
  page = 0;
  size = 9;
  totalPages = 0;

  filtros: { [key: string]: string } = {
    nombreObra: '',
    autor: '',
    categoria: '',
    valoracionMedia: '',
  };
  obraSeleccionada: ObraDto | null = null;
  mostrarDetalle = false;
  mostrarFormulario = false;
  categorias: CategoriaDto[] = [];
  @Output() creada = new EventEmitter<any>();

  obraSeleccionadaArtista: ListaObraDto | null = null;

  constructor(
    private obrasService: ObrasService,
    private categoriasService: CategoriasService
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
      },
    });
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

  abrirFormulario(): void {
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  obraCreada(): void {
    this.mostrarFormulario = false;
    this.loadObras();
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
      valoraciones: obra.valoraciones ?? [],
    };
    this.mostrarDetalle = true;
  }

  cerrarDetalle() {
    this.mostrarDetalle = false;
    this.obraSeleccionada = null;
    this.loadObras();
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
