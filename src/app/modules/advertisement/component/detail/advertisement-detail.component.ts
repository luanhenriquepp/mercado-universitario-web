import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Advertisement} from '../../interface/advertisement.interface';

@Component({
  selector: 'app-advertisement-detail',
  templateUrl: './advertisement-detail.component.html'
})
export class AdvertisementDetailComponent implements OnInit {
  advertisement: Advertisement;

  constructor(private router: Router,
              protected activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      this.advertisement = data.detalhe;
    });

  }

  goBack(): void {
    this.router.navigate(['advertisement']);
  }

}
