export interface EditUserRequest {
  nombre: string;
  apellidos: string;
  username: string;
  email: string;
  password?: string; // Opcional, solo si permites cambiar la contraseña
}