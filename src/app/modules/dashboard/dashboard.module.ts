import {NgModule} from '@angular/core';
import {CoreModule} from '../../core/core.module';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {DashboardService} from './dashboard.service';

const ROUTES: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [],
    data: {
      title: 'Inicio'
    }
  }
];

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [DashboardService],
  declarations: [DashboardComponent]
})
export class DashboardModule {
}
