export interface UsuarioDto {
  idUser: string;
  nombre: string;
  apellidos: string;
  username: string;
  email: string;
  fotoPerfil?: string;
  createdAt: string;
  password?: string;
  verifyPassword?: string;
}