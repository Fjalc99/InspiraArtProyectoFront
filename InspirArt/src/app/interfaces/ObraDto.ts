

import { ComentarioDto } from "./ComentarioDto";
import { ValoracionDto } from "./ValoracionDto";


export interface ObraDto {
  idObra: string;
  nombre: string;
  fechaSubida: string;
  imagenObra: string;
  nombreArtista?: string;
  categoria: { nombre: string; idCategoria: string };
  mediaValoracion: number;
  comentarios: ComentarioDto[];
  valoraciones: ValoracionDto[];

}