import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {LoginHelpDialogComponent} from '../../help/login-help-dialog.component';
import {AuthService} from '../../../../core/auth/auth.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {API_BASE} from '../../../../app.constants';
import {NotificationService} from '../../../../core/service/notification.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  imageSrc: string = require('../../../../../../logo.png');

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      registration: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required])
    });
  }

  openDialog(): void {
    this.dialog.open(LoginHelpDialogComponent, {
      height: '500px',
      width: '700px',
    });
  }

  login(): void {
    if (this.form.valid) {
      this.http.post(`${API_BASE}/login`, {...this.form.value}).subscribe((data) => {
        this.authService.login(data).subscribe(() => {
          this.router.navigate(['dashboard']);
        });
      }, (result) => {
        try {
          let message = result.error.errors.username[0];
          message = message.replace(/<(?:.|\n)*?>/gm, '').replace(/(?:\r\n|\r|\n|↵)/g, '').replace(/\\n/g, '');
          this.notificationService.notify(message);
        } catch (e) {
          this.notificationService.notify('Matrícula ou senha inválidos!!');
        }
      });
    }
  }
}
