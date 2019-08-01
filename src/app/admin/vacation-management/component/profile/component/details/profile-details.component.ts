import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../../../../core/service/notification.service';
import {ProfileService} from '../../service/profile.service';
import {PerfilUserInterface} from '../interface/perfil-user.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  perfil: PerfilUserInterface;
  contentDisable = true;

  constructor(protected activateRoute: ActivatedRoute,
              private profileService: ProfileService,
              private router: Router, private formBuilder: FormBuilder,
              protected notificationService: NotificationService) {
  }


  form = new FormGroup({id_perfil: this.formBuilder.control(1)});

  ngOnInit() {
    this.activateRoute.data.subscribe((data: any) => {
      this.perfil = data.detalhe;
      console.log(data.detalhe);
    });
  }
  goBack(): void {
    this.router.navigate(['perfil']);
  }

  changeUser(evento) {
    this.form.controls.id_perfil.setValue(2);
  }

  changeManagement(evento) {
    this.form.controls.id_perfil.setValue(1);
  }

  checkBoxChange(event) {
    this.contentDisable = true;
    if (event.checked) {
      return this.contentDisable = false;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const data = {
        id: this.perfil.id,
        id_perfil: this.form.value.id_perfil
      } as PerfilUserInterface;
      this.profileService.updateStatus(data).subscribe(
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
  }

}
