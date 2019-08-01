import {ProfileService} from './service/profile.service';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CoreModule} from '../../../../core/core.module';
import {RouterModule, Routes} from '@angular/router';
import {ChangeProfileComponent} from './component/change-profile/change-profile.component';
import {ProfileDetailsComponent} from './component/details/profile-details.component';
import {AuthGuard} from '../../../../core/auth/auth.guard';
import {ProfileDetailResolver} from './resolver/profile-detail.resolver';

const ROUTES: Routes = [
  {
    path: 'perfil', canActivateChild: [AuthGuard],
    data: {
      title: 'Perfis de Usuário'
    },
    children: [
      {path: '', component: ChangeProfileComponent},
      {
        path: 'edit/:id',
        component: ProfileDetailsComponent,
        resolve: {
          detalhe: ProfileDetailResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [ProfileService, ProfileDetailResolver],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ChangeProfileComponent, ProfileDetailsComponent]
})

export class ProfileModule {
}
