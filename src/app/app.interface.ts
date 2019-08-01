import {VacationManagement} from './admin/vacation-management/interface/vacation-management.interface';

export interface AppInterface extends VacationManagement {
  id?: number;
  id_usuario?: number;
  id_status: string;
  usuario: Usuario;
}
export interface Usuario extends VacationManagement {
  cd_usuario: number;
  login: string;
  name: string;
}
