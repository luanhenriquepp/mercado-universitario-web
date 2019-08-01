export interface Vacation {
  id?: number;
  id_usuario: number;
  id_status: string;
  usuario: Usuario;
  abono: boolean;
  status: Status;
  data_criacao: string;
  data_atualizacao: string;
  justificativa_gestor?: string;
  justificativa_usuario?: string;
  periodos: Periodo[];
}
export interface Periodo {
  id: number;
  id_solicitacao: number;
  data_inicial: any;
  data_final: any;
}

export interface Status {
  id: number;
  status: string;
}
export interface Usuario {
  cd_usuario: number;
  login: string;
  name: string;

}
