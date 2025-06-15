import { Component, OnInit } from '@angular/core';
import { ArtistaService } from '../../services/artista.service';
import { ArtistaDto } from '../../interfaces/ArtistaDto';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  artistas: ArtistaDto[] = [];
  page = 0;
  size = 10;
  totalPages = 0;
  mostrarFormulario = false;
  artistaSeleccionado: Partial<ArtistaDto> = {};
  artistaDetalle: ArtistaDto | null = null;

  constructor(private artistaService: ArtistaService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loadArtistas();
  }

  async loadArtistas() {
    try {
      const data: any = await firstValueFrom(this.artistaService.getArtistas(this.page, this.size));
      this.artistas = data.content;
      this.totalPages = data.totalPages;
    } catch (error) {
      console.error('Error fetching artistas:', error);
      this.artistas = [];
      this.totalPages = 0;
    }
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.loadArtistas();
    }
  }

  crearArtista() {
    this.artistaSeleccionado = {
      nombre: '',
      apellidos: '',
      email: '',
      password: '',
      verifyPassword: ''
    };
    this.mostrarFormulario = true;
  }

  editarArtista(artista: ArtistaDto) {
    this.artistaSeleccionado = { ...artista};
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.artistaSeleccionado = {};
  }

  async onGuardarArtista(event: { artista: any, file: File | null }) {
    const { artista, file } = event;
    const formData = new FormData();

    if (artista.idArtista) {
      // EDITAR
      const artistaEdit = { ...artista };
      delete artistaEdit.idArtista;
      formData.append('artista', new Blob([JSON.stringify(artistaEdit)], { type: 'application/json' }));
      if (file) {
        formData.append('file', file);
      }
      try {
        await firstValueFrom(this.artistaService.updateArtista(artista.idArtista, formData));
        this.mostrarFormulario = false;
        await this.loadArtistas();
      } catch (error) {
        console.error('Error al guardar el artista:', error);
      }
    } else {
      // CREAR
      formData.append('createArtistaDto', new Blob([JSON.stringify(artista)], { type: 'application/json' }));
      if (file) {
        formData.append('file', file);
      }
      try {
        await firstValueFrom(this.artistaService.createArtista(formData));
        this.router.navigate(['/activar-cuenta-artista']);
        this.mostrarFormulario = false;
        await this.loadArtistas();
      } catch (error) {
        console.error('Error al guardar el artista:', error);
      }
    }
  }

  verArtista(artista: ArtistaDto) {
    this.artistaDetalle = artista;
  }

  async eliminarArtista(artista: ArtistaDto) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px',
    data: { mensaje: '¿Seguro que quieres eliminar este artista?' }
  });

  const result = await firstValueFrom(dialogRef.afterClosed());
  if (result) {
    try {
      await firstValueFrom(this.artistaService.deleteArtista(artista.idArtista));
      await this.loadArtistas();
    } catch (error) {
      console.error('Error al eliminar el artista:', error);
    }
  }
}

  getImageUrl(nombreArchivo?: string): string {
    if (!nombreArchivo) return 'assets/no-image.png';

    // Si la URL contiene "/download/https", extrae la parte externa
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