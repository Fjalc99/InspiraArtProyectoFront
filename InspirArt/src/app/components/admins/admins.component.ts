import { Component, OnInit } from '@angular/core';
import { AdminsService } from '../../services/admins.service';
import { AdminDto } from '../../interfaces/AdminDto';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent implements OnInit {

  admins: AdminDto[] = [];
  page = 0;
  size = 10;
  totalPages = 0;
   mostrarFormulario = false;
  adminSeleccionado: Partial<AdminDto> = {};
  adminDetalle: AdminDto | null = null;


  constructor(private adminsService: AdminsService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  async loadAdmins() {
  try {
    const data: any = await firstValueFrom(this.adminsService.getAdmins(this.page, this.size));
    this.admins = data.content;
    this.totalPages = data.totalPages;
  } catch (error) {
    console.error('Error fetching admins:', error);
    this.admins = [];
    this.totalPages = 0;
  }
}




 crearAdmin() {
    this.adminSeleccionado = {
      nombre: '',
      apellidos: '',
      username: '',
      email: '',
      password: '',
      verifyPassword: ''
    };
    this.mostrarFormulario = true;
  }

  editarAdmin(admin: AdminDto) {
    this.adminSeleccionado = { ...admin};
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.adminSeleccionado = {};
  }

  async onGuardarAdmin(event: { admin: any, file: File | null }) {
    const { admin, file } = event;
    const formData = new FormData();

    if (admin.idAdmin) {
      // EDITAR
      const adminEdit = { ...admin };
      delete adminEdit.idAdmin;
      formData.append('admin', new Blob([JSON.stringify(adminEdit)], { type: 'application/json' }));
      if (file) {
        formData.append('file', file);
      }
      try {
        await firstValueFrom(this.adminsService.updateAdmin(admin.idAdmin, formData));
        this.mostrarFormulario = false;
        await this.loadAdmins();
      } catch (error) {
        console.error('Error al guardar el admin:', error);
      }
    } else {
      // CREAR
      formData.append('createAdminDto', new Blob([JSON.stringify(admin)], { type: 'application/json' }));
      if (file) {
        formData.append('file', file);
      }
      try {
        await firstValueFrom(this.adminsService.createAdmin(formData));
        this.router.navigate(['/activar-cuenta-admin']);
        this.mostrarFormulario = false;
        await this.loadAdmins();
      } catch (error) {
        console.error('Error al guardar el admin:', error);
      }
    }
  }

  verAdmin(admin: AdminDto) {
    this.adminDetalle = admin;
  }

  async eliminarAdmin(admin: AdminDto) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { mensaje: '¿Seguro que quieres eliminar este administrador?' }
    });

    const result = await firstValueFrom(dialogRef.afterClosed());
    if (result) {
      try {
        await firstValueFrom(this.adminsService.deleteAdmin(admin.idAdmin));
        await this.loadAdmins();
      } catch (error) {
        console.error('Error al eliminar el admin:', error);
      }
    }
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.loadAdmins();
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
