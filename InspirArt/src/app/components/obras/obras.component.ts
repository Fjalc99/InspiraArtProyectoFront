import { Component, OnInit } from '@angular/core';
import { ObrasService } from '../../services/obras.service';
import { ObraDto } from '../../interfaces/ObraDto';
import { ListaObraDto } from '../../interfaces/ListaObraDto';
import { CategoriaDto } from '../../interfaces/categoria/CategoriaDto';
import { CategoriasService } from '../../services/categorias.service';
import { ComentariosService } from '../../services/comentarios.service';
import { ComentarioDto } from '../../interfaces/ComentarioDto';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateObraDto } from '../../interfaces/CreateObraDto';

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


  nuevoComentario: string = '';
  comentarioEditandoId: string | null = null;
  comentarioEditado: string = '';
  
  mostrarDetalle = false;
  mostrarFormulario = false;
  esEdicion = false;
  obraSeleccionada: Partial<ObraDto> = {};
categorias: CategoriaDto[] = [];

  constructor(private obrasService: ObrasService,
     private categoriasService: CategoriasService,
      private comentariosService: ComentariosService,
      private dialog: MatDialog
    ) { }

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
    ...obra,
    nombreArtista: (obra as any).nombreArtista ?? (obra as any).nombreAutor ?? ''
  };
  console.log('Obra seleccionada:', this.obraSeleccionada);
  this.mostrarDetalle = true;
  this.mostrarFormulario = false;
  this.esEdicion = false;
}



 eliminarObra(idObra: string) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px',
    data: { mensaje: '¿Seguro que quieres eliminar esta obra?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.obrasService.eliminarObra(idObra).subscribe({
        next: () => this.loadObras(),
        error: err => console.error('Error eliminando obra:', err)
      });
    }
  });
}

  cerrarDetalle() {
    this.mostrarDetalle = false;
    this.obraSeleccionada = {};
    this.loadObras();
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.obraSeleccionada = {};
    this.esEdicion = false;
  }


  empezarEditarComentario(comentario: ComentarioDto) {
  this.comentarioEditandoId = comentario.idComentario;
  this.nuevoComentario = comentario.comentario;
}





agregarComentarioAdmin() {
  if (!this.nuevoComentario || this.nuevoComentario.length === 0 || !this.obraSeleccionada?.idObra) return;
  const comentario: Partial<ComentarioDto> = {
    comentario: this.nuevoComentario,
    idObra: this.obraSeleccionada.idObra
  };
  this.comentariosService.crearComentarioAdministrador(comentario as ComentarioDto).subscribe({
    next: (nuevo) => {
      if (!this.obraSeleccionada.comentarios) this.obraSeleccionada.comentarios = [];
      this.obraSeleccionada.comentarios.push(nuevo);
      this.nuevoComentario = '';
    }
  });
}


editarComentarioAdmin(comentario: ComentarioDto) {
  this.comentarioEditandoId = comentario.idComentario;
  this.comentarioEditado = comentario.comentario;
}

guardarEdicionComentarioAdmin(comentario: ComentarioDto) {
  if (!this.nuevoComentario.trim()) return;
  this.comentariosService.editarComentarioAdministrador(comentario.idComentario, { ...comentario, comentario: this.nuevoComentario }).subscribe({
    next: (editado) => {
      if (this.obraSeleccionada.comentarios) {
        const idx = this.obraSeleccionada.comentarios.findIndex(c => c.idComentario === comentario.idComentario);
        if (idx > -1) this.obraSeleccionada.comentarios[idx] = editado;
      }
      this.comentarioEditandoId = null;
      this.nuevoComentario = '';
    }
  });
}

cancelarEdicionComentarioAdmin() {
  this.comentarioEditandoId = null;
  this.comentarioEditado = '';
}


eliminarComentarioAdmin(comentario: ComentarioDto) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px',
    data: { mensaje: '¿Seguro que quieres eliminar este comentario?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.comentariosService.deleteComentarioAdministrador(comentario.idComentario).subscribe({
        next: () => {
          if (this.obraSeleccionada.comentarios) {
            this.obraSeleccionada.comentarios = this.obraSeleccionada.comentarios.filter(
              c => c.idComentario !== comentario.idComentario
            );
          }
        }
      });
    }
  });
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
    return `http://localhost:8081/download/${nombreArchivo}`;
  }

get Math() {
  return Math;
}
}