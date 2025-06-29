// detalle-obra-artista.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ObraDto } from '../../interfaces/ObraDto';


@Component({
  selector: 'app-detalle-obra-artista',
  templateUrl:'./detalle-obra-artista.component.html',
  styleUrls: ['./detalle-obra-artista.component.css']
})
export class DetalleObraArtistaComponent {
  @Input() obraSeleccionada!: ObraDto;
  @Output() cerrar = new EventEmitter<void>();

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
        return `http://localhost:8081/download/${nombreArchivo}`;
      }

       cerrarDetalle() {
    this.cerrar.emit();
  }


  get Math() {
    return Math;
  }
}