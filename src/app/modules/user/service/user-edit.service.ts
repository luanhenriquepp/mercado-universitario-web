import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {HttpDataAbstract} from '../../../shared/abstract/http-data.abstract';
import {State, UserEditInterface} from '../interface/user-edit.interface';
import {Cities} from '../../login/component/register/interface/state.interface';
import {API_BASE} from '../../../app.constants';
import {Advertisement} from '../../advertisement/interface/advertisement.interface';


@Injectable()
export class UserEditService extends HttpDataAbstract<UserEditInterface> {
  constructor(protected http: HttpClient) {
    super(http, 'users');
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${API_BASE}/current/user`);
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

  update(data: UserEditInterface): Observable<UserEditInterface> {
    return this.http.put<UserEditInterface>(`${API_BASE}/users/${data['cd_user']}`, data);
  }
}
