import {Injectable} from '@angular/core';
import { VacationManagement} from '../interface/vacation-management.interface';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {HttpDataAbstract} from '../../../shared/abstract/http-data.abstract';
import {API_BASE} from '../../../app.constants';
import {Paginator} from '../../../shared/model/paginator.model';


@Injectable()
export class VacationManagementService extends HttpDataAbstract<VacationManagement> {

  constructor(protected http: HttpClient) {
    super(http, 'solicitacaoferias');
  }
  updateStatus(status: VacationManagement): Observable<VacationManagement> {
    return this.http.put<VacationManagement>(`${API_BASE}/solicitacaoferias/atualizarstatus/${status['id']}`, status);
  }

  getAllPending(page: string, search?: string): Observable<Paginator<VacationManagement>> {
    return this.http.get<Paginator<VacationManagement>>(`${API_BASE}/solicitacaoferias/pendentes`, {params: {page}});
  }
  getAllApproved(page: string, search?: string): Observable<Paginator<VacationManagement>> {
    return this.http.get<Paginator<VacationManagement>>(`${API_BASE}/solicitacaoferias/aprovadas`, {params: {page}});
  }
  getAllDisapproved(page: string, search?: string): Observable<Paginator<VacationManagement>> {
    return this.http.get<Paginator<VacationManagement>>(`${API_BASE}/solicitacaoferias/reprovadas`, {params: {page}});
  }
  getAllCanceled(page: string, search?: string): Observable<Paginator<VacationManagement>> {
    return this.http.get<Paginator<VacationManagement>>(`${API_BASE}/solicitacaoferias/canceladas`, {params: {page}});
  }
}