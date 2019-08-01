import {Component} from '@angular/core';
import {VacationManagementService} from '../../service/vacation-management.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../../core/service/notification.service';
import * as OptionsList from '../../constants/vacation-management.constants';
import {VacationManagement} from '../../interface/vacation-management.interface';
import UF from '../../../../shared/constant/uf.constant';
import {Options} from '../../../../shared/model/options.model';
import {PersistAbstract} from '../../../../shared/abstract/persist.abstract';
import * as Mask from '../../../../core/constants/mask';
import * as moment from 'moment';

@Component({
  selector: 'app-vacation-management-persist',
  templateUrl: './vacation-management-persist.component.html',
  styleUrls: ['./vacation-management-persist.component.css']
})
export class VacationManagementPersistComponent extends PersistAbstract<VacationManagement> {
  optionsList = OptionsList;
  ufs: Array<Options> = UF;
  mask: any = Mask;

  constructor(protected vacationManagementService: VacationManagementService,
              private router: Router,
              protected route: ActivatedRoute,
              protected notificationService: NotificationService,
              private formBuilder: FormBuilder) {
    super(vacationManagementService, notificationService, route);
  }

  formInit(): FormGroup {
    return this.formBuilder.group({
      social_name: this.formBuilder.control(''),
      classification_tax: this.formBuilder.control(''),
      legal_nature: this.formBuilder.control(''),
      corporate: this.formBuilder.control(''),
      construction: this.formBuilder.control(''),
      sheet_discharge: this.formBuilder.control(''),
      employee_electronic_record: this.formBuilder.control(''),
      school_entity_code: this.formBuilder.control(''),
      international_organizations: this.formBuilder.control(''),
      complementary_info: this.formBuilder.control(''),

      temporary_job: this.formBuilder.control(''),
      temporary_job_number: this.formBuilder.control(''),

      contact: this.formBuilder.group({
        name: this.formBuilder.control(''),
        cpf: this.formBuilder.control(''),
        phone: this.formBuilder.control(''),
        mobile: this.formBuilder.control(''),
        email: this.formBuilder.control(''),
      }),
      software_house: this.formBuilder.group({
        social_name: this.formBuilder.control(''),
        name: this.formBuilder.control(''),
        cnpj: this.formBuilder.control(''),
        phone: this.formBuilder.control(''),
        email: this.formBuilder.control('')
      }),
      public_agency: this.formBuilder.group({
        siafi: this.formBuilder.control(''),
        federally_responsible: this.formBuilder.group({
          indicative: this.formBuilder.control(''),
          cnpj: this.formBuilder.control(''),
          federative: this.formBuilder.group({
            name: this.formBuilder.control(''),
            uf: this.formBuilder.control(''),
            ibge: this.formBuilder.control(''),
            regime_social_security: this.formBuilder.control(''),
            subtetus: this.formBuilder.control(''),
            subtetus_value: this.formBuilder.control('')
          })
        }),
        displayPublicAgency: this.formBuilder.control(false)
      }),
      new_validity: this.formBuilder.group({
        start: this.formBuilder.control(''),
        end: this.formBuilder.control('')
      }),
      period_start: this.formBuilder.control('', Validators.required),
      period_end: this.formBuilder.control('', Validators.required)
    });
  }

  /**
   *  Display
   */
  displayPublicAgency(): boolean {
    return this.form.get('public_agency').get('displayPublicAgency').value;
  }


  goBack(): void {
    this.router.navigate(['vacationManagement']);
  }
}

