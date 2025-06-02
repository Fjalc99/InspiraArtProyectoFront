import { Component, OnInit } from '@angular/core';
import { ArtistaService } from '../../services/artista.service';
import { ArtistaDto } from '../../interfaces/ArtistaDto';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  artistas: ArtistaDto[] = [];
  page = 0;
  size = 10;
  totalPages = 0;

  constructor(private artistaService: ArtistaService) {}

  ngOnInit(): void {
    this.loadArtistas();
  }

  async loadArtistas() {
    try {
      const data: any = await firstValueFrom(this.artistaService.getArtistas(this.page, this.size));
      this.artistas = data.content;
      this.totalPages = data.totalPages;
    } catch (error) {
      console.error('Error fetching artistas:', error);
      this.artistas = [];
      this.totalPages = 0;
    }
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.loadArtistas();
    }
  }
}