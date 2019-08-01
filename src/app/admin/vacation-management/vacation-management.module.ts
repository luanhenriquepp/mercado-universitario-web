import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {VacationManagementPersistComponent} from './component/persist/vacation-management-persist.component';
import {VacationManagementService} from './service/vacation-management.service';
import {VacationManagementResolver} from './resolver/vacation-management.resolver';
import {VacationManagementListComponent} from './component/list/vacation-management-list.component';
import {AuthGuard} from '../../core/auth/auth.guard';
import {DetailsComponent} from './component/details/details.component';
import {VacationManagementDetailResolver} from './resolver/vacation-management-detail.resolver';
import { VacationManagementEditComponent } from './component/vacation-management-edit/vacation-management-edit.component';

const ROUTES: Routes = [
  {
    path: 'vacation-management', canActivateChild: [AuthGuard],
    data: {
      title: 'Solicitações'
    },
    children: [
      {path: '', component: VacationManagementListComponent},
      {
        path: 'details/:id', component: DetailsComponent,
        resolve: {
          detalhe: VacationManagementDetailResolver
        }
      },
      {
        path: 'edit/:id', component: VacationManagementEditComponent,
        resolve: {
          detalhe: VacationManagementResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [VacationManagementListComponent, VacationManagementPersistComponent, VacationManagementEditComponent],
  providers: [VacationManagementResolver, VacationManagementService, VacationManagementDetailResolver ]
})
export class VacationManagementModule {
}
