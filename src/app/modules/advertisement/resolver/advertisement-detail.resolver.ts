import {Injectable} from '@angular/core';
import {ResolverAbstract} from '../../../shared/abstract/resolver.abstract';
import {AdvertisementService} from '../service/advertisement.service';
import {Advertisement} from '../interface/advertisement.interface';

@Injectable()
export class AdvertisementDetailResolver extends ResolverAbstract<Advertisement> {

    constructor(private advertisementService: AdvertisementService) {
        super(advertisementService);
    }

}
