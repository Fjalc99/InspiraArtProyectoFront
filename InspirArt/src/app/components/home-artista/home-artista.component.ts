import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-artista',
  templateUrl: './home-artista.component.html',
  styleUrl: './home-artista.component.css'
})
export class HomeArtistaComponent {


  constructor(private router: Router) {}

   logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
