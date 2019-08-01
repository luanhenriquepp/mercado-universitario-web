import {BrowserModule} from '@angular/platform-browser';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {ROUTES} from './app.routes';
import {SharedModule} from './shared/shared.module';
import {VacationModule} from './modules/vacation/vacation.module';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {VacationManagementModule} from './admin/vacation-management/vacation-management.module';
import {DetailsComponent} from './admin/vacation-management/component/details/details.component';
import {LoginModule} from './modules/login/login.module';
import {VacationDetailsComponent} from './modules/vacation/component/vacation-details/vacation-details.component';
import {VacationEmergencyComponent} from './modules/vacation/component/emergency/vacation-emergency.component';
import {ProfileModule} from './admin/vacation-management/component/profile/profile.module';
import {AdvertisementModule} from './modules/advertisement/advertisement.module';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {AdvertisementManagementModule} from './admin/advertisement-management/advertisement-management.module';
import {UserModule} from './modules/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    VacationDetailsComponent,
    VacationEmergencyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule.forRoot(),
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules}),
    LoginModule,
    DashboardModule,
    VacationModule,
    VacationManagementModule,
    ProfileModule,
    AdvertisementModule,
    CurrencyMaskModule,
    AdvertisementManagementModule,
    UserModule
  ],
  exports: [],

  bootstrap: [AppComponent]
})
export class AppModule {
}
