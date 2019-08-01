import {Injectable} from '@angular/core';
import {ResolverAbstract} from '../../../../../shared/abstract/resolver.abstract';
import {PerfilUserInterface} from '../component/interface/perfil-user.interface';
import {ProfileService} from '../service/profile.service';

@Injectable()
export class ProfileResolver extends ResolverAbstract<PerfilUserInterface> {

  constructor(private profileService: ProfileService) {
    super(profileService);
  }
}
