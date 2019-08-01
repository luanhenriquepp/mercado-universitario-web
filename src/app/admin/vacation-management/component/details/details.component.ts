import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VacationManagement} from '../../interface/vacation-management.interface';
import {VacationManagementService} from '../../service/vacation-management.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from '../../../../core/service/notification.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  ferias: VacationManagement;

  form = new FormGroup({
    status: new FormControl('', Validators.required),
    justificativa_gestor: new FormControl({value: '', disabled: true}, Validators.compose([Validators.required, Validators.minLength(30)]))
  });

  constructor(protected activateRoute: ActivatedRoute,
              private vacationManagementService: VacationManagementService,
              private router: Router,
              protected notificationService: NotificationService) {
  }

  ngOnInit() {
    this.activateRoute.data.subscribe((data: any) => {
      this.ferias = data.detalhe;
      console.log(data);
    });

  }

  goBack(): void {
    this.router.navigate(['vacation-management']);
  }

  reprova(evento) {
    if (!evento.checked) {
      this.form.controls.justificativa_gestor.disable();
    }
    return this.form.controls.justificativa_gestor.enable();
  }

  aprova(evento) {
    if (!evento.checked) {
      this.form.controls.justificativa_gestor.disable();
    }
  }


  onSubmit() {
    console.log(this.form.valid);
    if (this.form.valid) {
      const data = {
        id: this.ferias.id,
        id_status: this.form.value.status,
        justificativa_gestor: this.form.value.justificativa_gestor
      } as VacationManagement;
      this.vacationManagementService.updateStatus(data).subscribe(
        () => {
          this.goBack();
        },
        this.onError
      );
    }
    console.log(this.form.value.status);
  }


  onError = (errorResponse: HttpErrorResponse): void => {
    if (!errorResponse.error.message) {
      throw errorResponse;
    }
    return this.notificationService.notify(errorResponse.error.message || 'Erro desconhecido');
  };
}


