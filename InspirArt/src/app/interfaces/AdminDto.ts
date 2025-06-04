export interface AdminDto {
    idAdmin: string;
    nombre: string;
    apellidos: string;
    username: string;
    email: string;
    fotoPerfil?: string;
    createdAt: string;
    password?: string;
    verifyPassword?: string;
}