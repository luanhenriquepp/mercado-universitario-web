import { Component, OnInit } from '@angular/core';
import {ListAbstract} from '../../../../../../shared/abstract/list.abstract';
import {Router} from '@angular/router';
import {NotificationService} from '../../../../../../core/service/notification.service';
import {Event} from '../../../../../../modules/dashboard/models/event.model';
import {ProfileService} from '../../service/profile.service';
import {Paginator} from '../../../../../../shared/model/paginator.model';
import {Observable} from 'rxjs/Observable';
import {MatSelectChange} from '@angular/material';
import {PerfilUserInterface} from '../interface/perfil-user.interface';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent extends ListAbstract<PerfilUserInterface> implements OnInit {
  // perfil: PerfilUserInterface;
  filter = 'funcionario';

  filtros: Array<{ id_perfil: string, label: string }> = [
    {id_perfil: 'funcionario', label: 'Funcionários'},
    {id_perfil: 'gestor', label: 'Gestores'}
  ];

  events: Event[ ];

  displayedColumns = [
    'name',
    'perfil',
    'action'
  ];
  isSendAction: boolean;

  constructor(protected profileService: ProfileService,
              protected notificationService: NotificationService,
              protected router: Router) {
    super(profileService, notificationService);
  }

  onAdd () {
  }

  onEdit(perfil: PerfilUserInterface): void {
    this.router.navigate([`perfil/edit/${perfil.id}`]);
  }

  onRemove () {
  }



  updateDataSource(data?: any) {
    const page = data ? data.pageIndex + 1 : 0;
    this.isLoadingResults = true;
    this.selection.clear();
    let service: Observable<Paginator<PerfilUserInterface>>;

    if (this.filter === 'funcionario') {
      service = this.profileService.getAllUser(page.toString());
    }

    if (this.filter === 'gestor') {
      service = this.profileService.getAllManager(page.toString());
    }

    service.subscribe((result: Paginator<PerfilUserInterface>) => {
      this.isLoadingResults = false;
      this.dataSource.data = result.data;
      this.pageSize = result.per_page;
      this.resultsLength = result.total;
    }, error => {
      this.isLoadingResults = false;
      throw error;
    });
  }

}
