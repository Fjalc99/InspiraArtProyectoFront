import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioDto } from '../../interfaces/UsuarioDto';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
  Usuarios: UsuarioDto[] = [];
  page = 0;
  size = 10;
  totalPages = 0;
  mostrarFormulario = false;
  usuarioSeleccionado: Partial<UsuarioDto> = {};
  usuarioDetalle: UsuarioDto | null = null;

  constructor(private usuarioService: UsuariosService, private dialog: MatDialog, private router: Router) {}

  async ngOnInit() {
    await this.loadUsuarios();
  }

  async loadUsuarios() {
    try {
      const data: any = await firstValueFrom(
        this.usuarioService.getUsuarios(this.page, this.size)
      );
      this.Usuarios = data.content;
      this.totalPages = data.totalPages;
    } catch (error) {
      console.error('Error fetching usuarios:', error);
      this.Usuarios = [];
      this.totalPages = 0;
    }
  }

  async goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      await this.loadUsuarios();
    }
  }

  crearUsuario() {
    this.usuarioSeleccionado = {
      nombre: '',
      apellidos: '',
      username: '',
      email: '',
      password: '',
      verifyPassword: '',
    };
    this.mostrarFormulario = true;
  }

  editarUsuario(usuario: UsuarioDto) {
    this.usuarioSeleccionado = { ...usuario };
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.usuarioSeleccionado = {};
  }

async onGuardarUsuario(event: { usuario: any, file: File | null }) {
  const { usuario, file } = event;
  const formData = new FormData();

  if (usuario.idUser) {
    
    const usuarioEdit = { ...usuario };
    delete usuarioEdit.idUser;
    formData.append('user', new Blob([JSON.stringify(usuarioEdit)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    try {
      await firstValueFrom(this.usuarioService.updateUsuario(usuario.idUser, formData));
      this.mostrarFormulario = false;
      await this.loadUsuarios();
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  } else {
    
    formData.append('createUserDto', new Blob([JSON.stringify(usuario)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    this.usuarioService.createUsuario(formData).subscribe({
  next: (respuesta) => {
    
    this.router.navigate(['/activar-cuenta-usuario']);
  },
});
}
}

  verUsuario(usuario: UsuarioDto) {
  this.usuarioDetalle = usuario;
}

  async eliminarUsuario(usuario: UsuarioDto) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { mensaje: '¿Seguro que quieres eliminar este usuario?' }
    });

    const result = await firstValueFrom(dialogRef.afterClosed());
    if (result) {
      try {
        await firstValueFrom(this.usuarioService.deleteUsuario(usuario.idUser));
        console.log('Usuario eliminado:', usuario.idUser);
        await this.loadUsuarios();
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
      }
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
    return `http://localhost:8081/download/${nombreArchivo}`;
  }


}