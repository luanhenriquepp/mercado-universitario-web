import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {VacationPersistComponent} from './component/persist/vacation-persist.component';
import {VacationService} from './service/vacation.service';
import {VacationResolver} from './resolver/vacation.resolver';
import {VacationListComponent} from './component/list/vacation-list.component';
import {AuthGuard} from '../../core/auth/auth.guard';
import {VacationDetailResolver} from './resolver/vacation-detail.resolver';
import {VacationDetailsComponent} from './component/vacation-details/vacation-details.component';
import {VacationEmergencyComponent} from './component/emergency/vacation-emergency.component';

const ROUTES: Routes = [
  {
    path: 'vacation', canActivateChild: [AuthGuard],
    data: {
      title: 'Solicitação de Férias'
    },
    children: [
      {path: '', component: VacationListComponent},
      {path: 'add', component: VacationPersistComponent},
      {path: 'emergency', component: VacationEmergencyComponent},
      {path: 'details/:id', component: VacationDetailsComponent,
        resolve: {
          detalhe: VacationDetailResolver
        }
      },
      {
        path: 'edit/:id',
        resolve: {
          responseData: VacationResolver
        },
        component: VacationPersistComponent
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
  declarations: [VacationListComponent, VacationPersistComponent],
  providers: [VacationResolver, VacationService, VacationDetailResolver]
})
export class VacationModule {
}
