import {Component, OnInit} from '@angular/core';
import {VacationService} from '../../service/vacation.service';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../../core/service/notification.service';
import {Vacation} from '../../interface/vacation.interface';
import {PersistAbstract} from '../../../../shared/abstract/persist.abstract';
import * as moment from 'moment';
import {Moment} from 'moment';
import {ValidationErrors} from '@angular/forms/src/directives/validators';
import {MatCheckboxChange} from '@angular/material';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-vacation-persist',
  templateUrl: './vacation-persist.component.html',
  styleUrls: ['./vacation-persist.component.css']
})
export class VacationPersistComponent extends PersistAbstract<Vacation> implements OnInit {
  diasDisponiveis = 30;
  diasAbono = 10;
  checado = false;

  constructor(protected vacationService: VacationService,
              private router: Router,
              protected route: ActivatedRoute,
              protected notificationService: NotificationService,
              private formBuilder: FormBuilder) {
    super(vacationService, notificationService, route);
  }

  formInit(): FormGroup {
    const formGroup: FormGroup = this.formBuilder.group({
      abono: this.formBuilder.control(0),
      justificativa_usuario: new FormControl({value: '', disabled: true},
        Validators.compose([Validators.required, Validators.minLength(30)])),
      periodos: this.formBuilder.array([
        this.createPeriod(0),
        this.createPeriod(1),
        this.createPeriod(2)
      ])
    });
    return formGroup;
  }

  ngOnInit() {
    super.ngOnInit();
    this.form.get('periodos.1.data_inicial').valueChanges.subscribe(valueDate => {
      const total = this.form ? this.calcTotalPrimeiraData() : 0;
      if (!valueDate) {
        return;
      }
      if (total > 20 && total < 26) {
        this.form.get('periodos.1.data_final').setValue(moment(Object.assign({}, valueDate)).add(30 - total, 'days'));
      }
    });
    this.form.get('periodos.2.data_inicial').valueChanges.subscribe(value => {
      const total = this.form ? this.calcTotalDuasPrimeirasDatas() : 0;
      if (!value) {
        return;
      }
      this.form.get('periodos.2.data_final').setValue(moment(Object.assign({}, value)).add(30 - total, 'days'));
    });
  }

  onAdd(): void {
    this.router.navigate(['vacation/emergency']);
  }

  transformReceiveData(data: any): Vacation {
    data.abono = (data.abono === 1);
    data.periodos.forEach((periodo) => {
      periodo.data_inicial = moment(periodo.data_inicial, 'YYYY-MM-DD');
      periodo.data_final = moment(periodo.data_final, 'YYYY-MM-DD');
    });
    return data;
  }

  onReceiveData(): void {
    this.route.data.subscribe((data: { responseData: Vacation }) => {
      if (data.responseData) {
        this.dataId = data.responseData['id'].toString();
        this.form.patchValue(this.transformReceiveData(data.responseData));
        if (this.form.controls.justificativa_usuario.value !== '') {
          this.form.controls.justificativa_usuario.enable();
        }
        this.isUpdate = true;
      }
    });
  }


  /**
   *  Volta para tela inicial
   */
  goBack(): void {
    this.router.navigate(['vacation']);
  }

  createPeriod(index: number): FormGroup {
    return this.formBuilder.group({
      data_inicial: this.formBuilder.control('', [this.validaPeriodoMinimo(index)]),
      data_final: this.formBuilder.control('', [this.validaPeriodoMaximo(index).bind(this), Validators.required])
    });
  }

  getListPeriod(): FormArray {
    return this.form.get('periodos') as FormArray;
  }

  /**
   * Calcula o valor total de dias preenchidos
   */
  calcTotalDias(): number {
    let result = this.getListPeriod().controls
      .filter(control => !!control.get('data_inicial').value && !!control.get('data_final').value)
      .map(control => {
        const dataInicial = control.get('data_inicial').value as Moment;
        const dataFinal = control.get('data_final').value as Moment;
        if (!dataFinal) {
          return 0;
        }
        return dataFinal.diff(dataInicial, 'days');
      }).reduce((acc, cur) => acc + cur, 0);
    result += (this.form.controls.abono.value ? this.diasAbono : 0);
    return result;
  }

  calcTotalPrimeiraData(): number {
    return (this.form.get('periodos.0.data_final').value as Moment).diff(this.form.get('periodos.0.data_inicial').value as Moment, 'days');
  }

  calcTotalDuasPrimeirasDatas(): number {
    return (this.form.get('periodos.0.data_final').value as Moment).diff(this.form.get('periodos.0.data_inicial').value as Moment, 'days')
      + (this.form.get('periodos.1.data_final').value as Moment).diff(this.form.get('periodos.1.data_inicial').value as Moment, 'days');
  }

  calcTotalDaysForControl(control: FormGroup): number {
    const dataInicial = control.get('data_inicial').value as Moment;
    const dataFinal = control.get('data_final').value as Moment;
    return dataInicial && dataFinal ? dataFinal.diff(dataInicial, 'days') : 0;
  }

  /**
   * Verifica se o periodo mínimo é de 14 dias
   */
  validaPeriodoMinimo(index: number): ValidatorFn {
    return function (control: FormGroup): ValidationErrors | null {
      if (!control.parent) {
        return {'invalidDate': 'Data inválida'};
      }
      const dataInicial = control.parent.get('data_inicial').value as Moment;
      const formArray = control.parent.parent as FormArray;
      if (index > 0) {
        const dataFinalAnterior = formArray.at(index - 1).get('data_final').value as Moment;
        if (dataFinalAnterior) {
          const dias = dataFinalAnterior.diff(dataInicial, 'days');
          if (dias > 0) {
            return {'invalidDate': 'Data inválida'};
          }
        }
      }
      return null;
    };
  }

  validaPeriodoMaximo(index: number): ValidatorFn {
    const total = this.form ? this.calcTotalDias() : 0;
    const diasDisponiveis = this.diasDisponiveis;
    return function (control: FormGroup): ValidationErrors | null {
      if (!control.parent) {
        return {'invalidDate': 'Data inválida'};
      }

      const dataInicial = control.parent.get('data_inicial').value as Moment;
      const dataFinal = control.parent.get('data_final').value as Moment;
      if (!dataInicial || !dataFinal) {
        return {'invalidDate': 'Data inválida'};
      }

      const diferencaEmDias = dataFinal.diff(dataInicial, 'days');

      if (index === 0 && total !== 30 && (diferencaEmDias < 14 || diferencaEmDias > 30)) {
        return {'invalidDate': 'A data deve ser no mínimo de 14 dias e no maximo 30 dias'};
      }

      if (index === 1 && total !== 30 && (diferencaEmDias < 5 || diferencaEmDias > 16)) {
        return {'invalidDate': 'O segundo período deve ter no mínimo 5 dias e no máximo 16 dias'};
      }

      if (index === 2 && (diferencaEmDias < 5) && total < 30) {
        return {'invalidDate': 'O terceiro período deve ter no mínimo 5 dias'};
      }
      return total < 30 || total > 30 ? null : {'invalidDate': 'O somatorio deve ser menor do que 30 dias'};
    };
  }

  displayItem(item: FormGroup, index: number) {
    if (index === 0) {
      return true;
    }

    let diasDisponiveis = this.diasDisponiveis;

    const firstControl = this.form.get('periodos') as FormArray;
    const totalFirst = this.calcTotalDaysForControl(firstControl.at(0) as FormGroup);
    const secondControl = this.form.get('periodos') as FormArray;
    const totalSecond = this.calcTotalDaysForControl(secondControl.at(1) as FormGroup);

    diasDisponiveis -= this.form.get('abono').value ? this.diasAbono : 0;

    if (index === 1 && totalFirst >= 14 && totalFirst < 26 && totalFirst < diasDisponiveis) {
      return true;
    }
    if (index === 2) {
      const firstMoreSecond = totalFirst + totalSecond;
      return (totalSecond >= 5 && (firstMoreSecond >= 22) && (firstMoreSecond <= 25));
    }
    return false;
  }

  getDataFinalMinima(item: FormGroup, index: number) {
    let days = 14;

    if (index > 0) {
      days = 5;
    }

    if (item.get('data_inicial').value) {
      const dataInicial = Object.assign({}, (item.get('data_inicial').value)) as Moment;
      return moment(dataInicial).add(days, 'day').startOf('days');
    }
    return new Date();
  }


  getDataInicialMinima(item: FormGroup, index: number) {
    if (index === 0) {
      return null;
    }
    const dataFinal = Object.assign({}, (this.form.get('periodos.' + (index - 1) + '.data_final').value)) as Moment;
    return moment(dataFinal).add(1, 'day').startOf('days');
  }

  transformBeforeSave(data) {
    data.periodos = data.periodos.filter(item => item.data_inicial && item.data_final).map(item => {
      const data_inicial = item.data_inicial as Moment;
      const data_final = item.data_final as Moment;
      if (data_inicial) {
        item.data_inicial = data_inicial.format('Y/M/D');
      }
      if (data_final) {
        item.data_final = data_final.format('Y/M/D');
      }
      return item;
    });
    return data;
  }

  sell(event: MatCheckboxChange) {
    this.form.controls.abono.setValue(event.checked ? 1 : 0);
  }

  disableDate() {
    const periodos = this.form.get('periodos') as FormArray;
    const periodosInvalidos = periodos.controls.filter((control: FormGroup) => {
      if (control.get('data_inicial').value) {
        return control.get('data_final').enable();
      }
      return control.get('data_final').disable();
    });
  }

  disableSave() {
    const valueIsInValid = this.calcTotalDias() !== 30;
    const periodos = this.form.get('periodos') as FormArray;
    const periodosInvalidos = periodos.controls.filter((control: FormGroup) => {
      if (control.get('data_inicial').value || control.get('data_final').value) {
        return !control.get('data_inicial').valid || !control.get('data_final').valid;
      }
      return false;
    });
    return valueIsInValid || periodosInvalidos.length > 0;
  }

  dataAcionada(evento) {
    this.checado = true;
    const dataInicial = this.form.get('periodos.0.data_inicial').value as Moment;
    const dataI = moment(dataInicial);
    const dataAtual = moment().add(30, 'days');
    if (this.isUpdate && dataI.isAfter(dataAtual)) {
      return this.form.get('justificativa_usuario').reset(null);
    }

    if (dataI.isAfter(dataAtual) || evento.checked) {
        this.checado = false;
        return this.form.controls.justificativa_usuario.disable();
    } else {
      this.checado = true;
      return this.form.controls.justificativa_usuario.enable();
    }
  }

  onSave() {
    let data = Object.assign({}, this.form.value) as VacationPersistComponent;
    data['id'] = this.dataId;
    data = this.transformBeforeSave(data);
    if (this.calcTotalDias() === 30 && !this.form.get('justificativa_usuario').invalid) {
      this.isLoading = true;
      if (this.isUpdate) {
        this.dataService.update(data).subscribe(this.onSuccess, this.onError, this.onComplete);
      } else {
        this.dataService.save(data).subscribe(this.onSuccess, this.onError, this.onComplete);
      }
    }
  }
}
