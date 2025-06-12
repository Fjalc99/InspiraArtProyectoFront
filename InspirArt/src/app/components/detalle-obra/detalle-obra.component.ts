import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ObraDto } from '../../interfaces/ObraDto';
import { ComentarioDto } from '../../interfaces/ComentarioDto';
import { ValoracionDto } from '../../interfaces/ValoracionDto';
import { ComentariosService } from '../../services/comentarios.service';
import { ValoracionesService } from '../../services/valoraciones.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-detalle-obra',
  templateUrl: './detalle-obra.component.html',
  styleUrls: ['./detalle-obra.component.css']
})
export class DetalleObraComponent {
  @Input() obraSeleccionada!: ObraDto;
  @Output() cerrar = new EventEmitter<void>();
  @Output() obraActualizada = new EventEmitter<ObraDto>();

  valoracionUsuario: number | null = null;
  valoracionActual: ValoracionDto | null = null;
  nuevoComentario: string = '';
  comentarioEditandoId: string | null = null;
  comentarioEditado: string = '';
  puntuacionSeleccionada: number | null = null;

  constructor(
    private comentariosService: ComentariosService,
    private valoracionesService: ValoracionesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cargarValoracionUsuario();
  }

  get Math() {
    return Math;
  }

  cerrarDetalle() {
    this.cerrar.emit();
  }

  agregarComentarioUsuario() {
    if (!this.nuevoComentario || !this.obraSeleccionada?.idObra) return;
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

  empezarEditarComentario(comentario: ComentarioDto) {
    this.comentarioEditandoId = comentario.idComentario;
    this.nuevoComentario = comentario.comentario;
  }

  guardarEdicionComentarioUsuario(comentario: ComentarioDto) {
    if (!this.nuevoComentario.trim()) return;
    this.comentariosService.editarComentarioUsuario(comentario.idComentario, {
      ...comentario,
      comentario: this.nuevoComentario
    }).subscribe({
      next: (editado) => {
        const idx = this.obraSeleccionada.comentarios.findIndex(c => c.idComentario === comentario.idComentario);
        if (idx > -1) this.obraSeleccionada.comentarios[idx] = editado;
        this.comentarioEditandoId = null;
        this.nuevoComentario = '';
      }
    });
  }

  cancelarEdicionComentarioUsuario() {
    this.comentarioEditandoId = null;
    this.nuevoComentario = '';
  }

  eliminarComentarioUsuario(comentario: ComentarioDto) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px',
    data: { mensaje: '¿Seguro que quieres eliminar este comentario?', mostrarEliminar: true }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.comentariosService.deleteComentarioUsuario(comentario.idComentario).subscribe({
        next: () => {
          this.obraSeleccionada.comentarios = this.obraSeleccionada.comentarios.filter(c => c.idComentario !== comentario.idComentario);
        }
      });
    }
  });
}

  seleccionarPuntuacion(p: number) {
    this.puntuacionSeleccionada = p;
  }

  enviarValoracion() {
  if (!this.valoracionUsuario || !this.obraSeleccionada?.idObra) return;

  const onSuccess = (val: ValoracionDto) => {
    this.valoracionActual = val;
    this.valoracionUsuario = val.puntuacion;

    // Actualizar o agregar la valoración en el array local
    if (!this.obraSeleccionada.valoraciones) this.obraSeleccionada.valoraciones = [];
    const idx = this.obraSeleccionada.valoraciones.findIndex(v => v.id === val.id);
    if (idx > -1) {
      this.obraSeleccionada.valoraciones[idx] = val;
    } else {
      this.obraSeleccionada.valoraciones.push(val);
    }

    this.actualizarMediaValoracionLocal();

    // Mostrar diálogo de éxito (sin mostrarEliminar)
    this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { mensaje: '¡Valoración realizada con éxito!' }
    });
  };

    if (this.valoracionActual) {
      // Editar valoración existente
      const valoracionEditada: ValoracionDto = {
        ...this.valoracionActual,
        puntuacion: this.valoracionUsuario,
        fecha: new Date().toISOString()
      };
      this.valoracionesService.editarValoracion(this.valoracionActual.id, valoracionEditada).subscribe({
        next: onSuccess
      });
    } else {
      // Crear nueva valoración
      const nuevaValoracion: Partial<ValoracionDto> = {
        puntuacion: this.valoracionUsuario,
        fecha: new Date().toISOString(),
        obraId: this.obraSeleccionada.idObra!
      };
      this.valoracionesService.crearValoracion(nuevaValoracion as ValoracionDto).subscribe({
        next: onSuccess
      });
    }
  }

  private actualizarMediaValoracionLocal() {
    if (this.obraSeleccionada.valoraciones && this.obraSeleccionada.valoraciones.length > 0) {
      const suma = this.obraSeleccionada.valoraciones.reduce((acc, v) => acc + v.puntuacion, 0);
      this.obraSeleccionada.mediaValoracion = suma / this.obraSeleccionada.valoraciones.length;
    } else {
      this.obraSeleccionada.mediaValoracion = 0;
    }
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
        }
      });
    }
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
}