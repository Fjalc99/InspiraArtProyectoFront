import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { ActivateAccountRequest } from '../../interfaces/ActivateAccountRequest';

@Component({
  selector: 'app-activar-cuenta-usuario',
  templateUrl: './activar-cuenta-usuario.component.html',
  styleUrls: ['./activar-cuenta-usuario.component.css']
})
export class ActivarCuentaUsuarioComponent {
  token: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  onSubmit() {
    const request: ActivateAccountRequest = { token: this.token };
    this.authService.activarCuentaUsuario(request).subscribe({
      next: () => {
        this.successMessage = 'Cuenta activada correctamente. Ya puedes iniciar sesión.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Token incorrecto o expirado.';
      }
    });
  }
}