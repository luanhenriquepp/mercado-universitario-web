import {Injectable} from '@angular/core';
import {VacationManagementService} from '../service/vacation-management.service';
import {ResolverAbstract} from '../../../shared/abstract/resolver.abstract';
import {VacationManagement} from '../interface/vacation-management.interface';

@Injectable()
export class VacationManagementDetailResolver extends ResolverAbstract<VacationManagement> {

    constructor(private vacationManagementService: VacationManagementService) {
        super(vacationManagementService);
    }

}

