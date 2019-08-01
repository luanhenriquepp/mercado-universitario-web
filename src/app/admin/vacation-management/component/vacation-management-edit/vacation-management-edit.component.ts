import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../../../core/service/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VacationManagementService} from '../../service/vacation-management.service';
import {VacationManagement} from '../../interface/vacation-management.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {PerfilUserInterface} from '../profile/component/interface/perfil-user.interface';

@Component({
  selector: 'app-vacation-management-edit',
  templateUrl: './vacation-management-edit.component.html',
  styleUrls: ['./vacation-management-edit.component.css']
})
export class VacationManagementEditComponent implements OnInit {
  vacationManagement: VacationManagement;

  constructor(protected activateRoute: ActivatedRoute,
              private vacationManagementService: VacationManagementService,
              private router: Router, private formBuilder: FormBuilder,
              protected notificationService: NotificationService) {
  }

  form = new FormGroup({
    id_status: this.formBuilder.control(''),
    justificativa_gestor: new FormControl('', Validators.compose([Validators.required, Validators.minLength(30)]))
  });

  ngOnInit() {
    this.activateRoute.data.subscribe((data: any) => {
      this.vacationManagement = data.detalhe;
      console.log(data.detalhe);
    });
  }

  goBack(): void {
    this.router.navigate(['vacation-management']);
  }

  reprovar(evento) {
    this.form.controls.id_status.setValue('CAN');
    console.log(evento);
  }

  onSubmit() {
    if (this.form.valid) {
      const data = {
        id: this.vacationManagement.id,
        id_status: this.form.value.id_status,
        justificativa_gestor: this.form.value.justificativa_gestor
      } as VacationManagement;
      this.vacationManagementService.updateStatus(data).subscribe(
        () => {
          this.goBack();
        },
        this.onError
      );
    }
  }

  onError = (errorResponse: HttpErrorResponse): void => {
    if (!errorResponse.error.message) {
      throw errorResponse;
    }
    return this.notificationService.notify(errorResponse.error.message || 'Erro desconhecido');
  };

}
