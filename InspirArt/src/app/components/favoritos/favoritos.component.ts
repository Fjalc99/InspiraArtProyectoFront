import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FavoritosService } from '../../services/favoritos.service';
import { FavoritoDto } from '../../interfaces/FavoritoDto';
import { ObraFavoritasDto } from '../../interfaces/ObraFavoritasDto';
import { Router } from '@angular/router';
import { ObraDto } from '../../interfaces/ObraDto';
import { ObrasService } from '../../services/obras.service';
import { ListaObraDto } from '../../interfaces/ListaObraDto';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  obras: ListaObraDto[] = [];
  favoritos: FavoritoDto[] = [];
  loading = true;
mostrarDetalle = false;
 obraSeleccionada: ObraDto | null = null;
  constructor(private favoritosService: FavoritosService, 
    private obrasService: ObrasService,
    private router: Router) {}

  ngOnInit(): void {
    this.cargarFavoritos();
  }


  

verDetalleObra(obra: ObraFavoritasDto) {
  this.obrasService.getObraById(obra.idObra).subscribe((obraCompleta: ObraDto) => {
    this.obraSeleccionada = obraCompleta;
    this.mostrarDetalle = true;
    console.log('Imagen detalle:', this.obraSeleccionada.imagenObra);
  });
}

cerrarDetalle() {
  this.mostrarDetalle = false;
  this.obraSeleccionada = null;
  this.cargarFavoritos(); // Recargar favoritos al cerrar el detalle
}
  cargarFavoritos() {
    this.loading = true;
    this.favoritosService.obtenerFavoritosPorUsuario().subscribe({
      next: res => {
        this.favoritos = res.content;
        this.loading = false;
      },
      error: () => {
        this.favoritos = [];
        this.loading = false;
      }
    });
  }

  eliminarFavorito(obraId: string) {
    this.favoritosService.eliminarFavorito(obraId).subscribe({
      next: () => this.cargarFavoritos()
    });
  }

getImageUrl(nombreArchivo?: string): string {
  if (!nombreArchivo) return 'assets/no-image.png';

  // Si la URL contiene "/download/https", extrae la parte externa
  const downloadIdx = nombreArchivo.indexOf('/download/https');
  if (downloadIdx !== -1) {
    const httpsIdx = nombreArchivo.indexOf('https', downloadIdx);
    if (httpsIdx !== -1) {
      return nombreArchivo.substring(httpsIdx);
    }
  }

  if (nombreArchivo.startsWith('http')) return nombreArchivo;
  return `http://localhost:8080/download/${nombreArchivo}`;
}

}