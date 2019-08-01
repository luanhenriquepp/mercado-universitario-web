import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdvertisementManagement} from '../../interface/advertisement-management.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PerfilUserInterface} from '../../../vacation-management/component/profile/component/interface/perfil-user.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {AdvertisementManagementService} from '../../service/advertisement-management.service';
import {NotificationService} from '../../../../core/service/notification.service';

@Component({
    selector: 'app-advertisement-management-detail',
    templateUrl: './advertisement-management-detail.component.html'
})
export class AdvertisementManagementDetailComponent implements OnInit {
    advertisement: AdvertisementManagement;
    contentDisable = true;

    constructor(private router: Router,
                protected formBuilder: FormBuilder,
                protected notificationService: NotificationService,
                protected advertisementManagementService: AdvertisementManagementService,
                protected activatedRoute: ActivatedRoute) {
    }

    form = new FormGroup({cd_advertisement_status: this.formBuilder.control(1)});
    ngOnInit() {
        this.activatedRoute.data.subscribe((data: any) => {
            this.advertisement = data.detalhe;
        });

    }
  onSubmit() {
    if (this.form.valid) {
      const data = {
        cd_advertisement: this.advertisement.cd_advertisement,
        cd_advertisement_status: this.form.value.cd_advertisement_status
      } as AdvertisementManagement;
      this.advertisementManagementService.updateAdvertisementStatus(data).subscribe(
        () => {
          this.goBack();
        },
        this.onError
      );
    }
  }

  aprove(evento) {
    this.form.controls.cd_advertisement_status.setValue('APV');
  }

  reprove(evento) {
    this.form.controls.cd_advertisement_status.setValue('RPV');
  }

  checkBoxChange(event) {
    this.contentDisable = true;
    if (event.checked) {
      return this.contentDisable = false;
    }
  }

  onError = (errorResponse: HttpErrorResponse): void => {
    if (!errorResponse.error.message) {
      throw errorResponse;
    }
    return this.notificationService.notify(errorResponse.error.message || 'Erro desconhecido');
  }


    goBack(): void {
        this.router.navigate(['advertisement-management']);
    }

}
