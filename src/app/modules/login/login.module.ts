import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {LoginComponent} from './component/login/login.component';
import {LoginHelpDialogComponent} from './help/login-help-dialog.component';
import { RegisterComponent } from './component/register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './component/register/service/user.service';
import {NgxViacepService} from '@brunoc/ngx-viacep';

const ROUTES: Routes = [
  {
    path: 'login',
    data: {
      title: 'Login'
    },
    component: LoginComponent
  },
  {
    path: 'register',
    data: {
      title: 'Registrar'
    },
    component: RegisterComponent
  }
];

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [LoginHelpDialogComponent, LoginComponent, RegisterComponent],
  entryComponents: [LoginHelpDialogComponent],
  providers: [UserService, NgxViacepService]
})
export class LoginModule {
}
