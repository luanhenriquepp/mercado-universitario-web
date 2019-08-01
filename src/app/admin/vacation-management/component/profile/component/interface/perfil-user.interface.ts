export interface PerfilUserInterface {
  id: number;
  id_usuario: number;
  usuario: Usuario;
  perfil: Perfil;
  id_perfil: number;
}

export interface Usuario {
  cd_usuario: number;
  login: string;
  name: string;
  email: string;
}
export interface Perfil {
  id: number;
  perfil: string;
  descricao: string;
}