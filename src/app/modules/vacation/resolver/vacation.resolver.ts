import {Injectable} from '@angular/core';
import {VacationService} from '../service/vacation.service';
import {ResolverAbstract} from '../../../shared/abstract/resolver.abstract';
import {Vacation} from '../interface/vacation.interface';

@Injectable()
export class VacationResolver extends ResolverAbstract<Vacation> {

  constructor(private vacationService: VacationService) {
    super(vacationService);
  }

}
