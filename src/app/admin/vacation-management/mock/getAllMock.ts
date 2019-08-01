import {getMock} from './getMock';
import {Paginator} from '../../../shared/model/paginator.model';
import {VacationManagement} from '../interface/vacation-management.interface';

export const getAllMock: Paginator<VacationManagement> = {
  'data': [
    getMock
  ],
  page: 1,
  per_page: 3,
  total: 12,
  total_pages: 4
};
