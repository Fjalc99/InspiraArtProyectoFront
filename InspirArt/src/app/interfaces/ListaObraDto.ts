
import { CategoriaDto } from "./categoria/CategoriaDto";
import { ComentarioDto } from "./ComentarioDto";
import { ValoracionDto } from "./ValoracionDto";

export interface ListaObraDto {
      idObra: string;
     nombre: string;
  fechaSubida: string;
  imagenObra: string;
  nombreAutor: string;
  categoria: CategoriaDto;
  comentarios: ComentarioDto[];
  mediaValoracion: number;
  valoraciones: ValoracionDto[];
}