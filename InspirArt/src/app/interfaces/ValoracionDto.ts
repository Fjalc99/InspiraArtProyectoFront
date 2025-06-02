import { ObraDto } from "./ObraDto";
import { UsuarioDto } from "./UsuarioDto";


export interface ValoracionDto {
  id: string;
  puntuacion: number;
  fechaValoracion: string;
  obra: ObraDto;
  usuario: UsuarioDto;
}