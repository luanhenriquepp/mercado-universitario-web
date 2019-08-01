import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import {Subject} from 'rxjs/Subject';

const jwtDecode = require('jwt-decode');
let _isReady = false;

@Injectable()
export class PasswordService extends AuthService {
  isEnable = true;
  onReady = new Subject();
  authenticate = false;

  init(): Observable<boolean> {
    const myObservable = Observable.create(observer => {
      _isReady = true;
      this.onReady.next(true);
      observer.next(true);
    });
    return myObservable;
  }

  login(auth: { access_token: string }): Observable<any> {
    const myObservable = Observable.create(observer => {
      localStorage.setItem('auth_token', auth.access_token);
      observer.next(auth);
    });
    return myObservable;
  }

  isReady(): boolean {
    return _isReady;
  }

  logout(): Observable<any> {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('roles');
    document.location.pathname = '/login';
    const myObservable = Observable.create(observer => {
      observer.next(true);
    });
    return myObservable;
  }

  redirectToLogin() {
    document.location.pathname = '/login';
  }

  isAuthenticate(): boolean | Observable<boolean> {
    const myObservable = Observable.create(observer => {
      this.tokenIsValid().subscribe(isValid => {
        if (!isValid) {
          this.redirectToLogin();
        }
        observer.next(isValid);
      }, () => {
        observer.next(false);
        this.redirectToLogin();
      });
    });
    return myObservable;
  }

  getToken(): Observable<string> {
    const myObservable = Observable.create(observer => {
      observer.next(localStorage.getItem('auth_token'));
    });
    return myObservable;
  }

  tokenIsValid(): Observable<boolean> {
    const myObservable = Observable.create(observer => {
      this.getToken().subscribe(token => {
        try {
          const decoded = jwtDecode(token);
          const exp = new Date(decoded.exp * 1000);
          if (exp.getTime() > new Date().getTime()) {
            observer.next(true);
          } else {
            observer.next(false);
          }
        } catch (e) {
          observer.next(false);
        }
      }, () => {
        observer.next(false);
      });
    });
    return myObservable;
  }

  getRoles(): Observable<Array<string>> {
    let roles = [];
    const myObservable = Observable.create(observer => {
      const decoded = jwtDecode(localStorage.getItem('auth_token'));
      if (decoded) {
        roles = decoded.roles || [];
      }
      observer.next(roles);
    });
    return myObservable;
  }

  getUsername(): Observable<string> {
    let name = '';
    const token = localStorage.getItem('auth_token');
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded && decoded.name) {
        name = decoded.name;
      }
    }
    const myObservable = Observable.create(observer => {
      observer.next(name);
    });
    return myObservable;
  }
}
