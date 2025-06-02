import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InspirArt';
   constructor(private router: Router) {}

   isLoginPage() {
    return this.router.url === '/login';
  }
}
