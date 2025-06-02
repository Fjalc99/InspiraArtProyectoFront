import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    username: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {
  }

    onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Ambos campos son obligatorios';
      return;
    }

    const loginRequest = { username: this.username, password: this.password };
    this.authService.login(this.username, this.password, loginRequest).subscribe({
      next: () => this.router.navigate(['/obra']),
      error: () => this.errorMessage = 'Usuario o contraseña incorrectos'
    });
  }

}