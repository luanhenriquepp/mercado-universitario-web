import {Injectable} from '@angular/core';
import {ResolverAbstract} from '../../../../../shared/abstract/resolver.abstract';
import {ProfileService} from '../service/profile.service';
import {PerfilUserInterface} from '../component/interface/perfil-user.interface';

@Injectable()
export class ProfileDetailResolver extends ResolverAbstract<PerfilUserInterface> {

  constructor(private profileService: ProfileService) {
    super(profileService);
  }
}