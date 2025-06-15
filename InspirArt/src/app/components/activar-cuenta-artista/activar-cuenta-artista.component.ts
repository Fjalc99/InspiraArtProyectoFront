import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { ActivateAccountRequest } from '../../interfaces/ActivateAccountRequest';

@Component({
  selector: 'app-activar-cuenta-artista',
  templateUrl: './activar-cuenta-artista.component.html',
  styleUrls: ['./activar-cuenta-artista.component.css']
})
export class ActivarCuentaArtistaComponent {
  token: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  onSubmit() {
    const request: ActivateAccountRequest = { token: this.token };
    this.authService.activarCuentaArtista(request).subscribe({
      next: () => {
        this.successMessage = 'Cuenta de artista activada correctamente. Ya puedes iniciar sesión.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Token incorrecto o expirado.';
      }
    });

     this.authService.activarCuentaArtistaAdmin(request).subscribe({
      next: () => {
        this.successMessage = 'Cuenta de artista activada correctamente. Ya puedes iniciar sesión.';
        setTimeout(() => this.router.navigate(['/artista']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Token incorrecto o expirado.';
      }
    });
  }

  
}