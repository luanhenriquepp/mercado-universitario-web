import {NotificationService} from '../../../../core/service/notification.service';
import {Router} from '@angular/router';
import {ListAbstract} from '../../../../shared/abstract/list.abstract';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../../../../shared/components/dialog/dialog.component';
import {Component} from '@angular/core';
import {VacationService} from '../../service/vacation.service';
import {Vacation} from '../../interface/vacation.interface';

@Component({
    selector: 'app-vacation-list',
    templateUrl: './vacation-list.component.html',
    styleUrls: ['./vacation-list.component.scss']
})

export class VacationListComponent extends ListAbstract<Vacation> {

    displayedColumns = [
        'periodos',
        'abono',
        'status',
        'id_status'
    ];

    isSendAction: boolean;

    constructor(protected vacationService: VacationService,
                protected notificationService: NotificationService,
                protected dialog: MatDialog,
                protected router: Router) {
        super(vacationService, notificationService);

    }

    onAdd(): void {
        this.router.navigate(['vacation/add']);
    }

    onRemove(vacation?: Vacation): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                confirmLabel: 'Sim',
                confirmColor: 'primary',
                title: 'Deseja excluir o item?'
            }
        });
        dialogRef.afterClosed().subscribe(action => {
            if (action) {
                vacation = vacation || this.selection.selected[0];
                this.vacationService.delete(vacation).subscribe(() => {
                    this.notificationService.notify('Item excluido com sucesso');
                    this.updateDataSource();
                }, err => {
                    this.notificationService.notify('Ocorreu um erro, verifique os campos informados');
                });
            }
        });
    }

    onEdit(vacation: Vacation): void {
      this.router.navigate([`vacation/edit/${vacation.id}`]);
    }
}
