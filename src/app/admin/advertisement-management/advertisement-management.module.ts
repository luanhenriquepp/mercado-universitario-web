import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../core/auth/auth.guard';
import {AdvertisementManagementListComponent} from './component/list/advertisement-management-list.component';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {AdvertisementManagementService} from './service/advertisement-management.service';
import {AdvertisementManagementDetailResolver} from './resolver/advertisement-management-detail.resolver';
import {AdvertisementManagementDetailComponent} from './component/detail/advertisement-management-detail.component';

const ROUTES: Routes = [
  {
    path: 'advertisement-management', canActivateChild: [AuthGuard],
    data: {
      title: 'Gerenciamento de Anúncios'
    },
    children: [
      {path: '', component: AdvertisementManagementListComponent},
        {
            path: 'detail/:id', component: AdvertisementManagementDetailComponent,
            resolve: {
                detalhe: AdvertisementManagementDetailResolver
            }
        },
      ],
  }];

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AdvertisementManagementListComponent, AdvertisementManagementDetailComponent],
  providers: [AdvertisementManagementService, AdvertisementManagementDetailResolver]
})
export class AdvertisementManagementModule { }
