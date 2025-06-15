import { Component, OnInit } from '@angular/core';
import { ObrasArtistaService } from '../../services/obras-artista.service';
import { ListaObraDto } from '../../interfaces/ListaObraDto';

@Component({
  selector: 'app-mis-obras',
  templateUrl: './mis-obras.component.html',
  styleUrls: ['./mis-obras.component.css']
})
export class MisObrasComponent implements OnInit {
  obras: ListaObraDto[] = [];
  loading = true;
  obraSeleccionada: ListaObraDto | null = null;
  mostrarFormulario = false;


  constructor(private obrasService: ObrasArtistaService) {}

  ngOnInit(): void {
    this.loadObras();
  }

  loadObras(): void {
    this.loading = true;
    this.obrasService.getObrasArtista().subscribe({
      next: resp => {
        this.obras = resp.content ?? resp;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  obraCreada(): void {
    this.mostrarFormulario = false;
    this.loadObras();
  }

  verDetalleObra(obra: ListaObraDto) {
    this.obraSeleccionada = obra;
  }

  cerrarDetalle() {
    this.obraSeleccionada = null;
  }

  getImageUrl(nombreArchivo?: string): string {
    if (!nombreArchivo) return 'assets/no-image.png';

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