import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../interface/user.interface';
import {Observable} from 'rxjs/Observable';
import {Cities, State} from '../interface/state.interface';
import {API_BASE} from '../../../../../app.constants';
import {HttpDataAbstract} from '../../../../../shared/abstract/http-data.abstract';

@Injectable()
export class UserService extends HttpDataAbstract<User> {
  constructor(protected http: HttpClient) {
    super(http, 'register');
  }

  getAllStates(): Observable<Array<State>> {
    return this.http.get<Array<State>>(`${API_BASE}/state`);
  }

  getCityByUf(id: number): Observable<Cities> {
    return this.http.get<Cities>(`${API_BASE}/cities/${id}`).map((response: any) => {
      return response.data as Cities;
    });
  }

  findCep (cep: any): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
