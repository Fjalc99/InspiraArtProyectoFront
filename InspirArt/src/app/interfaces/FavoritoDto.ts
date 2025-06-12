import { ObraFavoritasDto } from "./ObraFavoritasDto";


export interface FavoritoDto {
  id: string; // UUID de la obra
  obra: ObraFavoritasDto;
  usuarioId: string;
  fechaAgregado: string; // LocalDate como string (YYYY-MM-DD)
}
