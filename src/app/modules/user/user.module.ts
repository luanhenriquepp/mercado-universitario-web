import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {AuthGuard} from '../../core/auth/auth.guard';
import {UserEditComponent} from './edit/user-edit.component';
import {UserEditService} from './service/user-edit.service';


const ROUTES: Routes = [
  {
    path: 'users', canActivateChild: [AuthGuard],
    data: {
      title: 'Meu Cadastro'
    },
    children: [
      {path: '', component: UserEditComponent},
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
  declarations: [UserEditComponent],
  providers: [UserEditService]
})
export class UserModule {
}
