import { ListaObraDto } from "./ListaObraDto";

export interface ArtistaDto {

    nombre: string;
  apellidos: string;
  username: string;
  email: string;
  fotoPerfil: string;
  createdAt: string;
    listaObras: ListaObraDto[];
    idArtista: string;
    password?: string;
    verifyPassword?: string;
}