import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/profile-user.service';
import { UsuarioDto } from '../../interfaces/UsuarioDto';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  usuario: UsuarioDto | null = null;
  loading = true;
  editando = false;
  selectedFile?: File;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.usuarioService.getPerfilUsuario().subscribe({
        next: usuario => {
          this.usuario = usuario;
          this.loading = false;
        },
        error: () => this.loading = false
      });
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  guardarCambios(): void {
    if (this.usuario) {
      this.usuarioService.actualizarPerfilUsuarioMe(this.usuario, this.selectedFile).subscribe({
        next: updatedUser => {
          this.usuario = updatedUser;
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