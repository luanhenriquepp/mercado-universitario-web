import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpDataAbstract} from '../../../../../shared/abstract/http-data.abstract';
import {PerfilUserInterface} from '../component/interface/perfil-user.interface';
import {API_BASE} from '../../../../../app.constants';
import {Paginator} from '../../../../../shared/model/paginator.model';
import {Observable} from 'rxjs/Observable';
import {VacationManagement} from '../../../interface/vacation-management.interface';

@Injectable()
export class ProfileService extends HttpDataAbstract<PerfilUserInterface> {

  constructor(protected http: HttpClient) {
    super (http, 'usuarioperfil');
  }

  updateStatus(perfil: PerfilUserInterface): Observable<PerfilUserInterface> {
    return this.http.put<PerfilUserInterface>(`${API_BASE}/usuarioperfil/${perfil['id']}`, perfil);
  }

  getAllUser(page: string, search?: string): Observable<Paginator<PerfilUserInterface>> {
    return this.http.get<Paginator<PerfilUserInterface>>(`${API_BASE}/usuarioperfil`, {params: {page}});
  }

  getAllManager(page: string, search?: string): Observable<Paginator<PerfilUserInterface>> {
    return this.http.get<Paginator<PerfilUserInterface>>(`${API_BASE}/usuarioperfil/gestor`, {params: {page}});
  }
}
