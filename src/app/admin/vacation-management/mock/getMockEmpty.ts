import {Status, VacationManagement} from '../interface/vacation-management.interface';

export const getMockEmpty: VacationManagement = {
  'id': 1,
  'id_usuario': 1,
  'id_status': 'teste',
  'usuario': {
    cd_usuario: 1,
    login: 'teste',
    name: 'teste',

  },
  'abono': false,
  'status': {
    id: 1,
    status: 'APV'
  },
  'data_criacao': 'teste',
  'data_atualizacao': 'teste',
  'justificativa_gestor': 'teste',
  'periodos': [],
};
