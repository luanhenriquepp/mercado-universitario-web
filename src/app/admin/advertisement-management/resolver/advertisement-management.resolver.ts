import {Injectable} from '@angular/core';
import {ResolverAbstract} from '../../../shared/abstract/resolver.abstract';
import {AdvertisementManagement} from '../interface/advertisement-management.interface';
import {AdvertisementManagementService} from '../service/advertisement-management.service';

@Injectable()
export class AdvertisementManagementResolver extends ResolverAbstract<AdvertisementManagement> {

    constructor(private advertisementManagementService: AdvertisementManagementService) {
        super(advertisementManagementService);
    }

}
