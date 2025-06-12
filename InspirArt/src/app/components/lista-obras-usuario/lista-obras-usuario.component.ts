import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ObrasService } from '../../services/obras.service';
import { ListaObraDto } from '../../interfaces/ListaObraDto';
import { ComentarioDto } from '../../interfaces/ComentarioDto';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaDto } from '../../interfaces/categoria/CategoriaDto';
import { ObraDto } from '../../interfaces/ObraDto';
import { CategoriasService } from '../../services/categorias.service';
import { ComentariosService } from '../../services/comentarios.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ValoracionDto } from '../../interfaces/ValoracionDto';
import { ValoracionesService } from '../../services/valoraciones.service';

@Component({
  selector: 'app-lista-obras-usuario',
  templateUrl: './lista-obras-usuario.component.html',
  styleUrls: ['./lista-obras-usuario.component.css']
})
export class ListaObrasUsuarioComponent implements OnInit {
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
    
  
   valoracionUsuario: number | null = null;
valoracionActual: ValoracionDto | null = null;
    nuevoComentario: string = '';
    comentarioEditandoId: string | null = null;
    comentarioEditado: string = '';
    
    mostrarDetalle = false;
    mostrarFormulario = false;
    esEdicion = true;
    obraSeleccionada: Partial<ObraDto> = {};
  categorias: CategoriaDto[] = [];
  puntuacionSeleccionada: number | null = null;
  
    constructor(private obrasService: ObrasService,
       private categoriasService: CategoriasService,
        private comentariosService: ComentariosService,
        private valoracionesService: ValoracionesService,
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
      this.obraSeleccionada = {
        ...obra,
        nombreArtista: (obra as any).nombreArtista ?? (obra as any).nombreAutor ?? ''
      };
      this.mostrarDetalle = true;
      this.mostrarFormulario = false;
      this.esEdicion = false;
      this.cargarValoracionUsuario(); // <--- Añade esto
    }
  
    aniadirObra() {
    this.loadCategorias();
    this.obraSeleccionada = {};
    this.mostrarFormulario = true;
    this.mostrarDetalle = false;
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
  this.loadObras(); // <- Refresca los datos
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
  
  
  
  
  
  agregarComentarioUsuario() {
    if (!this.nuevoComentario || this.nuevoComentario.length === 0 || !this.obraSeleccionada?.idObra) return;
    const comentario: Partial<ComentarioDto> = {
      comentario: this.nuevoComentario,
      idObra: this.obraSeleccionada.idObra
    };
    this.comentariosService.crearComentarioUsuario(comentario as ComentarioDto).subscribe({
      next: (nuevo) => {
        if (!this.obraSeleccionada.comentarios) this.obraSeleccionada.comentarios = [];
        this.obraSeleccionada.comentarios.push(nuevo);
        this.nuevoComentario = '';
      }
    });
  }
  
  // Editar comentario como admin
  editarComemtario(comentario: ComentarioDto) {
    this.comentarioEditandoId = comentario.idComentario;
    this.comentarioEditado = comentario.comentario;
  }
  
  guardarEdicionComentarioUsuario(comentario: ComentarioDto) {
    if (!this.nuevoComentario.trim()) return;
    this.comentariosService.editarComentarioUsuario(comentario.idComentario, { ...comentario, comentario: this.nuevoComentario }).subscribe({
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
  
  cancelarEdicionComentarioUsuario() {
    this.comentarioEditandoId = null;
    this.comentarioEditado = '';
  }
  
  // Eliminar comentario como admin
  eliminarComentarioUsuario(comentario: ComentarioDto) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { mensaje: '¿Seguro que quieres eliminar este comentario?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.comentariosService.deleteComentarioUsuario(comentario.idComentario).subscribe({
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

  

   valorarObra(puntuacion: number) {
    if (!this.obraSeleccionada?.idObra) return;
  
    if (this.valoracionActual) {
      const valoracionEditada: ValoracionDto = {
        ...this.valoracionActual,
        puntuacion,
        fecha: new Date().toISOString()
      };
      this.valoracionesService.editarValoracion(this.valoracionActual.id, valoracionEditada).subscribe({
        next: (val) => {
          this.valoracionActual = val;
          this.valoracionUsuario = val.puntuacion;
          this.cerrarDetalle(); // <-- Cierra el detalle tras valorar
        }
      });
    } else {
      const nuevaValoracion: Partial<ValoracionDto> = {
        puntuacion,
        fecha: new Date().toISOString(),
        obraId: this.obraSeleccionada.idObra!
      };
      this.valoracionesService.crearValoracion(nuevaValoracion as ValoracionDto).subscribe({
        next: (val) => {
          this.valoracionActual = val;
          this.valoracionUsuario = val.puntuacion;
          this.cerrarDetalle(); // <-- Cierra el detalle tras valorar
        }
      });
    }
  }

recargarObraSeleccionada() {
  if (!this.obraSeleccionada?.idObra) return;
  this.obrasService.getObraById(this.obraSeleccionada.idObra).subscribe({
    next: (obraActualizada) => {
      this.obraSeleccionada = {
        ...obraActualizada,
        mediaValoracion: (obraActualizada as any).mediaValoracion ?? (obraActualizada as any).valoracionMedia
      };
    }
  });
}


cargarValoracionUsuario() {
  if (!this.obraSeleccionada?.idObra) return;
  this.valoracionesService.obtenerValoracionesUsuario().subscribe({
    next: (data) => {
      const valoracion = data.content.find((v: ValoracionDto) => v.obraId === this.obraSeleccionada.idObra);
      if (valoracion) {
        this.valoracionActual = valoracion;
        this.valoracionUsuario = valoracion.puntuacion;
      } else {
        this.valoracionActual = null;
        this.valoracionUsuario = null;
      }
    }
  });
}



   
  

       getImageUrl(nombreArchivo?: string): string {
      if (!nombreArchivo) return 'assets/no-image.png';
      if (nombreArchivo.startsWith('http')) return nombreArchivo;
      return `http://localhost:8080/download/${nombreArchivo}`;
    }
  
  get Math() {
    return Math;
  }
  }