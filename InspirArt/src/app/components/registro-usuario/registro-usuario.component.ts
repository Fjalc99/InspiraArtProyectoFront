import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { RegisterUsuarioDto } from '../../interfaces/RegisterUsaurioDto';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  usuario: RegisterUsuarioDto = {
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
    this.authService.registerUsuario(this.usuario, this.file).subscribe({
      next: () => {
        alert('Usuario registrado correctamente. Revisa tu correo para activar la cuenta.');
        this.router.navigate(['/activar-cuenta-usuario']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrar usuario';
      }
    });
  }

  volverLogin() {
    this.router.navigate(['/login']);
  }
}