import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from './dashboard.service';
import {Event} from './models/event.model';
import {Router} from '@angular/router';
import {ListAbstract} from '../../shared/abstract/list.abstract';
import {NotificationService} from '../../core/service/notification.service';
import {Advertisement} from './dashboard.interface';
import {MatSort} from '@angular/material';
import * as Mask from '../../core/constants/mask';

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends ListAbstract<Advertisement> implements OnInit {
  events: Event[ ];

  @ViewChild(MatSort) sort: MatSort;

  mask: any = Mask;
  displayedColumns = [
    'userInformations',
    'advertisementInformation',

  ];

  constructor(protected dashboardService: DashboardService,
              protected notificationService: NotificationService,
              protected router: Router) {
    super(dashboardService, notificationService);

  }

  onAdd(): void {}
  onRemove(): void {}
  onEdit(): void {}

  ngOnInit() {
    super.ngOnInit();
    this.dataSource.sort = this.sort;
  }
}
