import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpDataAbstract} from '../../../shared/abstract/http-data.abstract';
import {Advertisement, Category} from '../interface/advertisement.interface';
import {API_BASE} from '../../../app.constants';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdvertisementService extends HttpDataAbstract<Advertisement> {
    constructor(protected http: HttpClient) {
        super(http, 'advertisement');
    }

    delete(advertisement: Advertisement): Observable<Advertisement> {
        return this.http.delete<Advertisement>(`${API_BASE}/advertisement/${advertisement['cd_advertisement']}`);
    }

  getAllCategory(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(`${API_BASE}/category`);
  }


    update(advertisement: Advertisement): Observable<Advertisement> {
        return this.http.put<Advertisement>(`${API_BASE}/advertisement/${advertisement['cd_advertisement']}`, advertisement);
    }
}
