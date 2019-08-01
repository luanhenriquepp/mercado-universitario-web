import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpDataAbstract} from '../../../shared/abstract/http-data.abstract';
import {Vacation} from '../interface/vacation.interface';


@Injectable()
export class VacationService extends HttpDataAbstract<Vacation> {

  constructor(protected http: HttpClient) {
    super(http, 'solicitacaoferias');
  }

  // update(status: Vacation): Observable<Vacation> {
  //   return this.http.put<Vacation>(`${API_BASE}/solicitacaoferias/${status['id']}`, status);
  // }
}
