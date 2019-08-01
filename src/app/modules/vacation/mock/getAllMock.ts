
import {getMock} from './getMock';
import {Paginator} from '../../../shared/model/paginator.model';
import {Vacation} from '../interface/vacation.interface';

export const getAllMock: Paginator<Vacation> = {
  'data': [
    getMock
  ],
  page: 1,
  per_page: 3,
  total: 12,
  total_pages: 4
};

