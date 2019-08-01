import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';

export abstract class AuthService {
  abstract onReady: Subject<any>;
  isEnable = true;

  abstract isReady(): boolean;

  abstract init(): Observable<boolean>;

  abstract login(auth: any): Observable<any>;

  abstract logout(): Observable<any>;

  abstract isAuthenticate(): boolean | Observable<boolean>;

  abstract getToken(): Observable<string>;

  abstract getRoles(): Observable<Array<string>>;

  abstract getUsername(): Observable<string>;
}
