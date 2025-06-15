import { Component } from '@angular/core';
import { AdminsService } from '../../services/admins.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-activar-cuenta-admin',
  templateUrl: './activar-cuenta-admin.component.html',
  styleUrl: './activar-cuenta-admin.component.css'
})
export class ActivarCuentaAdminComponent {


    token: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}


  onSubmit() {
    const request = { token: this.token };
    this.authService.activarCuentaAdmin(request).subscribe({
      next: () => {
        this.successMessage = 'Cuenta de administrador activada correctamente. Ya puedes iniciar sesión.';
        setTimeout(() => this.router.navigate(['/admins']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Token incorrecto o expirado.';
      }
    });
  }

}


   

