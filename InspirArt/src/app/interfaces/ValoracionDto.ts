export interface ValoracionDto {
  id: string;
  puntuacion: number;
  fecha: string;         // LocalDateTime como string ISO
  obraId: string;
  tituloObra: string;
}