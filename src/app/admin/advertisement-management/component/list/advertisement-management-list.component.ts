import {NotificationService} from '../../../../core/service/notification.service';
import {Router} from '@angular/router';
import {ListAbstract} from '../../../../shared/abstract/list.abstract';
import {Component} from '@angular/core';
import {AdvertisementManagement} from '../../interface/advertisement-management.interface';
import {AdvertisementManagementService} from '../../service/advertisement-management.service';

@Component({
  selector: 'app-advertisement-management-list',
  templateUrl: './advertisement-management-list.component.html'
})

export class AdvertisementManagementListComponent extends ListAbstract<AdvertisementManagement> {

  displayedColumns = [
    'name',
    'title',
    'advertisement_status',
    'category',
    'actions'

  ];
  isSendAction: boolean;

  constructor(
    protected advertisementManagementService: AdvertisementManagementService,
    protected notificationService: NotificationService,
    protected router: Router
  ) {
    super(advertisementManagementService, notificationService);
  }

  onAdd(): void {
    this.router.navigate(['advertisement/add']);
  }

  onEdit(advertisement: AdvertisementManagement): void {
    this.router.navigate([`advertisement/edit/${advertisement.cd_advertisement}`]);
  }

  onRemove(data?: AdvertisementManagement): void {
  }

}
