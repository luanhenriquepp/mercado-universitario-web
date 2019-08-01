import {Routes} from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {AuthGuard} from './core/auth/auth.guard';

export const ROUTES: Routes = [
  {
    path: '', canActivateChild: [AuthGuard], children: [
      {path: 'login', loadChildren: './modules/login/login.module#LoginModule'},
      {path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule'},
      {path: '', loadChildren: './modules/dashboard/dashboard.module#DashboardModule'},
      {path: 'vacation', loadChildren: './modules/vacation/vacation.module#VacationModule'},
      {path: '**', component: NotFoundComponent}
    ]
  },
  {path: '**', component: NotFoundComponent}
];
