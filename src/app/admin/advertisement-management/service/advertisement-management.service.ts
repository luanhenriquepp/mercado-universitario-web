import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {AdvertisementManagement} from '../interface/advertisement-management.interface';
import {HttpDataAbstract} from '../../../shared/abstract/http-data.abstract';
import {API_BASE} from '../../../app.constants';

@Injectable()
export class AdvertisementManagementService extends HttpDataAbstract<AdvertisementManagement> {
  constructor(protected http: HttpClient) {
    super(http, 'advertisement/awaiting-approval');
  }

  updateAdvertisementStatus(status: AdvertisementManagement): Observable<AdvertisementManagement> {
    return this.http.put<AdvertisementManagement>(`${API_BASE}/advertisement/update-status/${status['cd_advertisement']}`, status);
  }
}
