import {Component} from '@angular/core';
import {VacationManagementService} from '../../service/vacation-management.service';
import {VacationManagement} from '../../interface/vacation-management.interface';
import {NotificationService} from '../../../../core/service/notification.service';
import {Router} from '@angular/router';
import {ListAbstract} from '../../../../shared/abstract/list.abstract';
import {MatDialog, MatSelectChange} from '@angular/material';
import {DialogComponent} from '../../../../shared/components/dialog/dialog.component';
import {Paginator} from '../../../../shared/model/paginator.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-vacation-management-list',
  templateUrl: './vacation-management-list.component.html',
  styleUrls: ['./vacation-management-list.component.scss']
})
export class VacationManagementListComponent extends ListAbstract<VacationManagement> {
  ferias: VacationManagement;

  filter = 'AAP';

  filtros: Array<{ id_status: string, label: string }> = [
    {id_status: 'AAP', label: 'Pendentes'},
    {id_status: 'APR', label: 'Aprovadas'},
    {id_status: 'RPV', label: 'Reprovadas'},
    {id_status: 'CAN', label: 'Canceladas'}
  ];

  displayedColumns = [
    'id',
    'id_usuario',
    'id_ferias',
    'abono',
    'id_status'
  ];
  isSendAction: boolean;

  constructor(protected vacationManagementService: VacationManagementService,
              protected notificationService: NotificationService,
              protected dialog: MatDialog,
              protected router: Router) {
    super(vacationManagementService, notificationService);
  }

  onAdd(): void {
    this.router.navigate(['vacationManagement/add']);
  }


  onRemove(vacationManagement?: VacationManagement): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        confirmLabel: 'Sim',
        confirmColor: 'primary',
        title: 'Deseja excluir o item?'
      }
    });
    dialogRef.afterClosed().subscribe(action => {
      if (action) {
        vacationManagement = vacationManagement || this.selection.selected[0];
        this.vacationManagementService.delete(vacationManagement).subscribe(() => {
          this.notificationService.notify('Item excluido com sucesso');
          this.updateDataSource();
        }, err => {
          this.notificationService.notify('Ocorreu um erro, verifique os campos informados');
        });
      }
    });
  }

  onEdit(vacationManagement: VacationManagement): void {
    this.router.navigate([`vacationManagement/edit/${vacationManagement.id}`]);
  }


  updateDataSource(data?: any) {
    const page = data ? data.pageIndex + 1 : 0;
    this.isLoadingResults = true;
    this.selection.clear();
    let service: Observable<Paginator<VacationManagement>>;

    if (this.filter === 'AAP') {
      service = this.vacationManagementService.getAllPending(page.toString());
    }

    if (this.filter === 'APR') {
      service = this.vacationManagementService.getAllApproved(page.toString());
    }

    if (this.filter === 'RPV') {
      service = this.vacationManagementService.getAllDisapproved(page.toString());
    }
    if (this.filter === 'CAN') {
      service = this.vacationManagementService.getAllCanceled(page.toString());
    }

    service.subscribe((result: Paginator<VacationManagement>) => {
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

// eventDetail(vacationManagement: VacationManagement): void {
//  this.router.navigate([`event/detail//${vacationManagement.event.id}`]);
//  }}
