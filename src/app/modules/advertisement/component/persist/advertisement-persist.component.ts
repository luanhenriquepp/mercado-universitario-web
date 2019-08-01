import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../../core/service/notification.service';
import {PersistAbstract} from '../../../../shared/abstract/persist.abstract';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import {Advertisement, Category} from '../../interface/advertisement.interface';
import {AdvertisementService} from '../../service/advertisement.service';


@Component({
  selector: 'app-advertisement-persist',
  templateUrl: './advertisement-persist.component.html',
  styleUrls: ['./advertisement-persist.component.css']
})
export class AdvertisementPersistComponent extends PersistAbstract<Advertisement> implements OnInit {

  isLoadingResults: boolean;
  category: Category;
  advertisement_photo: Advertisement;
  optionsList: any = {
    todascategorias: [],
  };

  private image: any;

  constructor(protected advertisementService: AdvertisementService,
              private router: Router,
              protected route: ActivatedRoute,
              protected notificationService: NotificationService,
              private formBuilder: FormBuilder) {
    super(advertisementService, notificationService, route);
  }


  goBack(): void {
    this.router.navigate(['advertisement']);
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    }
    myReader.readAsDataURL(file);
    console.log(myReader);
  }

  formInit(): FormGroup {
    return this.formBuilder.group({
      cd_advertisement: this.formBuilder.control(''),
      title: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255)
      ])),
      ds_advertisement: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255)
      ])),
      cd_category: this.formBuilder.control('', Validators.compose([
        Validators.required,
      ])),
      price: this.formBuilder.control('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnInit() {
    this.form = this.formInit();
    this.onReceiveData();
    this.advertisementService.getAllCategory().subscribe(resp => {
      this.optionsList.todascategorias = resp;
    });
  }

  transformBeforeSave(data: Advertisement): Advertisement {
    data.advertisement_photo = this.image;
    return data;
  }
}
