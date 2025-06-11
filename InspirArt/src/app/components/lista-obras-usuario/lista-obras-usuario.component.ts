import { Component, OnInit } from '@angular/core';
import { ObrasService } from '../../services/obras.service';
import { ListaObraDto } from '../../interfaces/ListaObraDto';

@Component({
  selector: 'app-lista-obras-usuario',
  templateUrl: './lista-obras-usuario.component.html',
  styleUrls: ['./lista-obras-usuario.component.css']
})
export class ListaObrasUsuarioComponent implements OnInit {
  obras: ListaObraDto[] = [];
  page: number = 0;
  totalPages: number = 1;

  constructor(private obrasService: ObrasService) {}

  ngOnInit(): void {
    this.loadObras();
  }

  loadObras(): void {
    this.obrasService.getObras({}, this.page, 20).subscribe({
      next: (data: any) => {
        this.obras = data.content;
        this.totalPages = data.totalPages;
      },
      error: (error) => {
        console.error('Error al cargar obras:', error);
        this.obras = [];
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.loadObras();
    }
  }
}