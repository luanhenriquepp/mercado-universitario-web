import {Injectable} from '@angular/core';
import {ResolverAbstract} from '../../../shared/abstract/resolver.abstract';
import {Vacation} from '../interface/vacation.interface';
import {VacationService} from '../service/vacation.service';

@Injectable()
export class VacationDetailResolver extends ResolverAbstract<Vacation> {

  constructor(private vacationService: VacationService) {
    super(vacationService);
  }

}
