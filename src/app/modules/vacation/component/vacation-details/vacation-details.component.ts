import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Vacation} from '../../interface/vacation.interface';

@Component({
  selector: 'app-vacation-details',
  templateUrl: './vacation-details.component.html',
  styleUrls: ['./vacation-details.component.css']
})
export class VacationDetailsComponent implements OnInit {
  ferias: Vacation;

  constructor(private router: Router,
              protected activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      this.ferias = data.detalhe;
      console.log(data);
    });

  }

  goBack(): void {
    this.router.navigate(['vacation']);
  }

}
