export interface VacationManagement {
  id?: number;
  id_usuario?: number;
  id_status: string;
  usuario: Usuario;
  status?: Status;
  abono?: boolean;
  data_criacao?: string;
  data_atualizacao?: string;
  justificativa_gestor?: string;
  justificativa_usuario?: string;
  periodos?: Periodo[];
}
export interface Periodo {
  id: number;
  id_solicitacao: number;
  id_justificativa?: number;
  data_inicial: string;
  data_final: string;
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
