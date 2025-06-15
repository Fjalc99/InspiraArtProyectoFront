import { Component, OnInit } from '@angular/core';
import { ComentariosService } from '../../services/comentarios.service';
import { ComentarioDto } from '../../interfaces/ComentarioDto';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent implements OnInit {

  comentarios: ComentarioDto[] = [];
  page = 0;
  size = 10;
  totalPages = 0;

  constructor(private comentariosService: ComentariosService) { }

ngOnInit(): void {
    this.getComentarios();
  }

  getComentarios() {
    this.comentariosService.getComentarios(this.page, this.size).subscribe({
      next: (data: any) => {
        this.comentarios = data.content ? data.content : data;
      },
      error: (error) => {
        console.error('Error al cargar comentarios:', error);
        this.comentarios = [];
      }
    });
  }

  goToPage(page: number) {
    this.page = page;
    this.getComentarios();
  }
}