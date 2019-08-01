import {MAT_DIALOG_DATA} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {LOGIN_INFO} from '../../../app.constants';

@Component({
  selector: 'app-login-help-dialog',
  templateUrl: 'login-help-dialog.component.html',
})
export class LoginHelpDialogComponent {
  loginInfo: any = LOGIN_INFO;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
