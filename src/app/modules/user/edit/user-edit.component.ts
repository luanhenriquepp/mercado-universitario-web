import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import * as Mask from '../../../core/constants/mask';
import * as moment from 'moment/';
import {UserEditInterface} from '../interface/user-edit.interface';
import {UserEditService} from '../service/user-edit.service';
import {NotificationService} from '../../../core/service/notification.service';
import {PersistAbstract} from '../../../shared/abstract/persist.abstract';

@Component({
  templateUrl: './user-edit.component.html',
  selector: 'app-user-edit.component'
})

export class UserEditComponent extends PersistAbstract<UserEditInterface> implements OnInit {

  constructor(protected userEditService: UserEditService,
              private _formBuilder: FormBuilder,
              private router: Router,
              protected route: ActivatedRoute,
              protected notificationService: NotificationService,
  ) {
    super(userEditService, notificationService, route);
  }

  isLoadingResults: boolean;
  isLinear = false;
  mask: any = Mask;

  stateList: any = {
    allState: [],
  };
  cityList: any = {
    allCities: [],
  };
  private image: any;

  semesterList = [
    {value: '1', label: 'PRIMEIRO SEMESTRE'},
    {value: '2', label: 'SEGUNDO SEMESTRE'},
    {value: '3', label: 'TERCEIRO SEMESTRE'},
    {value: '4', label: 'QUARTO SEMESTRE'},
    {value: '5', label: 'QUINTO SEMESTRE'},
    {value: '6', label: 'SEXTO SEMESTRE'},
    {value: '7', label: 'SÉTIMO SEMESTRE'},
    {value: '8', label: 'OITAVO SEMESTRE'},
    {value: '9', label: 'NONO SEMESTRE'},
    {value: '10', label: 'DÉCIMO SEMESTRE'}
  ];

  universityNameList = [
    {value: '1', label: 'Faculdade Projeção Ceilândia'},
    {value: '2', label: 'Faculdade Projeção Guára'},
    {value: '3', label: 'Faculdade Projeção Sobradinho'},
    {value: '4', label: 'Faculdade Projeção Taguatinga'},
  ];

  courseList = [
    {value: '1', label: 'Administração'},
    {value: '2', label: 'Direito'},
    {value: '3', label: 'Recursos Humanos'},
    {value: '4', label: 'Sistemas da Informação'},
    {value: '5', label: 'Tecnologia em Analíse e Desenvolvimento de Sistemas'},
  ];

  getCityByUf(id) {
    this.userEditService.getCityByUf(id).subscribe(resp => {
      this.cityList.allCities = resp;
    });
  }
  findCep(cep) {
    this.userEditService.findCep(cep).subscribe(resp => {
      this.form.get('neighborhood').setValue(resp.bairro);
      this.form.get('public_place').setValue(resp.logradouro);
      return resp;
    });
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

  cpfValidation(controls) {
    const invalid = {'cpfValidation': true}; // Return as invalid username
    const cleanCPF = controls.value.replace(/\.|\-|\_|\s/g, ''),
      firstNineDigits = cleanCPF.substring(0, 9),
      checker = cleanCPF.substring(9, 11);

    if (cleanCPF.length !== 11) {
      return invalid;
    }

    // Checking if all digits are equal
    for (let i = 0; i < 10; i++) {
      const j = i + '';
      if ('' + firstNineDigits + checker === Array(12).join(j)) {
        return invalid;
      }
    }

    // Check first 9 digits
    let sum = null;

    for (let j = 0; j < 9; ++j) {
      sum += firstNineDigits.toString().charAt(j) * (10 - j);
    }

    const lastSumChecker1 = sum % 11;
    const checker1 = lastSumChecker1 < 2 ? 0 : 11 - lastSumChecker1;
    // check 2
    sum = null;

    const cpfWithChecker1 = firstNineDigits + checker1;
    for (let k = 0; k < 10; ++k) {
      sum += cpfWithChecker1.toString().charAt(k) * (11 - k);
    }

    const lastSumChecker2 = sum % 11;
    const checker2 = lastSumChecker2 < 2 ? 0 : 11 - lastSumChecker2;

    if (checker.toString() === checker1.toString() + checker2.toString()) {
      return null; // Return as valid CPF
    } else {
      return invalid;
    }
  }

  ngOnInit() {
      this.isUpdate = true;
    this.isLinear = true;
    this.formInit();
      this.form.controls['cpf'].disable();
      this.form.controls['rg'].disable();
      this.form.controls['registration'].disable();
    this.userEditService.getAllStates().subscribe(resp => {
      this.stateList.allState = resp;
    });
    this.userEditService.getCurrentUser().subscribe(resp => {
      this.form.patchValue(resp[0]);
    });
  }

  formInit(): FormGroup {
    this.isLinear = true;
    this.form = new FormGroup({
      cd_user: this._formBuilder.control('', Validators.required),
      name: this._formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ])),
      birth: this._formBuilder.control('', Validators.required),
      registration: this._formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.maxLength(32)
      ])),
     /* user_photo: this._formBuilder.control(''),*/
      cpf: this._formBuilder.control('', Validators.compose([
        Validators.required,
        this.cpfValidation
      ])),
      rg: this._formBuilder.control('', Validators.required),
      email: this._formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(100)
      ])),
      phone_number: this._formBuilder.control('', Validators.required),
     /* password: this._formBuilder.control('', Validators.required),
      password_confirmation: this._formBuilder.control('', Validators.required),*/
      cd_state: this._formBuilder.control('', Validators.required),
      cd_city: this._formBuilder.control('', Validators.required),
      cep: this._formBuilder.control('', Validators.required),
      public_place: this._formBuilder.control('', Validators.compose([
      ])),
      neighborhood: this._formBuilder.control('', Validators.compose([
      ])),
      complement: this._formBuilder.control(''),
      number: this._formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.maxLength(3)
      ])),
      semester: this._formBuilder.control('', Validators.required),
      university_name: this._formBuilder.control('', Validators.required),
      course: this._formBuilder.control('', Validators.required)
    });
    return this.form;
  }
  goBack(): void {
    this.router.navigate(['dashboard']);
  }


  transformBeforeSave(data: UserEditInterface): UserEditInterface {
    data.birth = moment(data.birth).format('Y-MM-DD');
    data.user_photo = this.image;
    return data;
  }
}
