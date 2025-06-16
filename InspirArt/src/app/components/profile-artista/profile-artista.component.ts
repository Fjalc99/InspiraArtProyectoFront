import { Component, OnInit } from '@angular/core';
import { ProfileArtistaService } from '../../services/profile-artista.service';
import { ArtistaDto } from '../../interfaces/ArtistaDto';

@Component({
  selector: 'app-profile-artista',
  templateUrl: './profile-artista.component.html',
  styleUrl: './profile-artista.component.css'
})
export class ProfileArtistaComponent implements OnInit {


artista: ArtistaDto | null = null;
  loading = true;
  editando = false;
  selectedFile?: File;

  constructor(private profileArtistaService: ProfileArtistaService) {}

  ngOnInit(): void {
    this.profileArtistaService.getPerfilArtista().subscribe({
      next: artista => {
        this.artista = artista;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  guardarCambios(): void {
    if (this.artista) {
      this.profileArtistaService.actualizarPerfilArtista(this.artista, this.selectedFile).subscribe({
        next: updatedArtista => {
          this.artista = updatedArtista;
          this.editando = false;
          alert('Perfil actualizado correctamente');
        },
        error: err => {
          console.error('Error al actualizar el perfil:', err);
          alert('Error al actualizar el perfil');
        }
      });
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.ngOnInit();
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

}
