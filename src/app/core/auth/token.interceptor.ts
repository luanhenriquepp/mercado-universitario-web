import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
import {AuthService} from './auth.service';
import {AuthMethod, environment} from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  handleInterception(token: string,
                     request: HttpRequest<any>,
                     next: HttpHandler) {
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }

  intercept(request: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const auth: AuthService = this.injector.get<AuthService>(AuthService as any) as AuthService;
    if (environment.auth_method === AuthMethod.NONE) {
      return next.handle(request);
    }
    if (auth.isReady()) {
      return auth.getToken().mergeMap((asyncToken: string) => {
        return this.handleInterception(asyncToken, request, next);
      });
    }
    if (!auth.isReady()) {
      return auth.onReady.mergeMap(() => {
        return auth.getToken().mergeMap((asyncToken: string) => {
          return this.handleInterception(asyncToken, request, next);
        });
      });
    }
  }
}



