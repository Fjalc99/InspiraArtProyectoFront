import { ArtistaFavoritosDto } from "./ArtistaFavoritosDto";

export interface ObraFavoritasDto {
  idObra: string;
  nombre: string;
  imagenObra: string;
  artista: ArtistaFavoritosDto;
}