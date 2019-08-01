import {NotificationService} from '../../../../core/service/notification.service';
import {Router} from '@angular/router';
import {ListAbstract} from '../../../../shared/abstract/list.abstract';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../../../../shared/components/dialog/dialog.component';
import {Component, OnInit} from '@angular/core';
import {Advertisement} from '../../interface/advertisement.interface';
import {AdvertisementService} from '../../service/advertisement.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-advertisement-list',
    templateUrl: './advertisement-list.component.html',
    styleUrls: ['./advertisement-list.component.scss']
})

export class AdvertisementListComponent extends ListAbstract<Advertisement> {

    displayedColumns = [
        'title',
        'advertisement_status',
        'category',
        'actions'

    ];
    isSendAction: boolean;

    constructor(protected advertisementService: AdvertisementService,
                protected notificationService: NotificationService,
                protected dialog: MatDialog,
                protected router: Router
              ) {
        super(advertisementService, notificationService);
    }

    onAdd(): void {
        this.router.navigate(['advertisement/add']);
    }

    onRemove(advertisement?: Advertisement): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data : {
                confirmLabel: 'Sim',
                confirmColor: 'primary',
                title: 'Deseja excluir o item?'
            }
        });

        dialogRef.afterClosed().subscribe(action => {
            if (action) {
                advertisement = advertisement || this.selection.selected[0];
                this.advertisementService.delete(advertisement).subscribe((resp: any) => {
                    if (resp.success) {
                        this.updateDataSource();
                    }
                    this.notificationService.notify(resp.message);
                }, err => {
                    this.notificationService.notify('Ocorreu um erro, verifique os campos informados');
                });
            }
        });
    }
    onEdit(advertisement: Advertisement): void {
        this.router.navigate([`advertisement/edit/${advertisement.cd_advertisement}`]);
    }

}
