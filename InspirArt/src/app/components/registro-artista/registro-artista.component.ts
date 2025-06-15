import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { RegisterArtistaDto } from '../../interfaces/RegisterArtistaDto';

@Component({
  selector: 'app-registro-artista',
  templateUrl: './registro-artista.component.html',
  styleUrl: './registro-artista.component.css'
})
export class RegistroArtistaComponent {

  artista: RegisterArtistaDto = {
    nombre: '',
    apellidos: '',
    username: '',
    email: '',
    password: '',
    verifyPassword: ''
  };
  file: File | null = null;
  errorMessage: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  onFileChange(event: any) {
    this.file = event.target.files[0] || null;
  }

   onSubmit() {
    this.authService.registerArtista(this.artista, this.file).subscribe({
      next: () => {
        alert('Artista registrado correctamente. Revisa tu correo para activar la cuenta.');
        this.router.navigate(['/activar-cuenta-artista']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrar artista';
      }
    });
  }

  volverLogin() {
  this.router.navigate(['/login']);
}
}