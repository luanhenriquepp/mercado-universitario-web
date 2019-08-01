import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';



import {AuthGuard} from '../../core/auth/auth.guard';
import {AdvertisementListComponent} from './component/list/advertisement-list.component';
import {AdvertisementPersistComponent} from './component/persist/advertisement-persist.component';
import {AdvertisementResolver} from './resolver/advertisement.resolver';
import {AdvertisementService} from './service/advertisement.service';
import {AdvertisementDetailResolver} from './resolver/advertisement-detail.resolver';
import {AdvertisementDetailComponent} from './component/detail/advertisement-detail.component';

const ROUTES: Routes = [
    {
        path: 'advertisement', canActivateChild: [AuthGuard],
        data: {
            title: 'Anúncios'
        },
        children: [
            {path: '', component: AdvertisementListComponent},
            {path: 'add', component: AdvertisementPersistComponent},
            {
                path: 'detail/:id', component: AdvertisementDetailComponent,
                resolve: {
                    detalhe: AdvertisementDetailResolver
                }
            },
            {
                path: 'edit/:id',
                resolve: {
                    responseData: AdvertisementResolver
                },
                component: AdvertisementPersistComponent
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
    declarations: [AdvertisementListComponent, AdvertisementPersistComponent, AdvertisementDetailComponent],
    providers: [AdvertisementResolver, AdvertisementService, AdvertisementDetailResolver]
})
export class AdvertisementModule {
}
