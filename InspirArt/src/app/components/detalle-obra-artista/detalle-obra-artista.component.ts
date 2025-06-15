// detalle-obra-artista.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ObraDto } from '../../interfaces/ObraDto';
import { ListaObraDto } from '../../interfaces/ListaObraDto';


@Component({
  selector: 'app-detalle-obra-artista',
  templateUrl: './detalle-obra-artista.component.html',
  styleUrls: ['./detalle-obra-artista.component.css']
})
export class DetalleObraArtistaComponent {
  @Input() obraSeleccionada!: ListaObraDto;
  @Output() cerrar = new EventEmitter<void>();

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

       cerrarDetalle() {
    this.cerrar.emit();
  }


  get Math() {
    return Math;
  }
}