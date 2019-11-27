import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {API_BASE} from '../../app.constants';
import {HttpDataAbstract} from '../../shared/abstract/http-data.abstract';
import {Paginator} from '../../shared/model/paginator.model';
import {Advertisement} from './dashboard.interface';

@Injectable()
export class DashboardService extends HttpDataAbstract<Advertisement> {

    constructor(protected http: HttpClient) {
        super(http, 'advertisement/public-page');
    }
    getAll(page: string, search?: string): Observable<Paginator<Advertisement>> {
        return this.http.get<Paginator<Advertisement>>(`${API_BASE}/advertisement/public-page`, {params: {page}});
    }
}
