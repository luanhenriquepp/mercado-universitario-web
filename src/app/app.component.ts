import {AfterViewInit, Component, HostBinding, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {MatSidenav} from '@angular/material';
import {AuthService} from './core/auth/auth.service';
import {Observable} from 'rxjs/Observable';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Title} from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AUTH_METHOD, AUTH_METHOD_ENUM, CLIENT_NAME, SYSTEM_NAME, SYSTEM_VERSION, THEME, THEME_AUTO_CONTRASTE} from './app.constants';
import {setTimeout} from 'timers';
import {PasswordService} from './core/auth/password.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy, OnInit, AfterViewInit {

  @HostBinding('class') theme = THEME;
  @ViewChild('drawer') drawer: MatSidenav;
 imageSrc: string = require('../../logo.png');
  subscription: Subscription;
  subscriptionAuth: Subscription;
  subscriptionMedia: Subscription;
  isMobileView = false;
  isLoading = true;
  isLoadingRouter = false;
  displayNav = false;
  defaultTitle = SYSTEM_NAME;
  name: string;
  system = SYSTEM_NAME;
  systemVersion = SYSTEM_VERSION;
  clientName: string = CLIENT_NAME;
  @ViewChild('container') private _container;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private media: ObservableMedia,
              private titleService: Title) {
    if (authService.isEnable) {
      const auth: Observable<boolean> = this.authService.init();
      auth.subscribe(() => {
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }

  }

  ngAfterViewInit() {
    this.subscription = this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (event.url.indexOf('login') === 1 || event.url.indexOf('register') === 1) {
            this.displayNav = false;
            if (this.drawer) {
              this.drawer.close();
            }
          } else {
            this.authService.getUsername().subscribe(name => {
              this.name = name;
            });
            this.displayNav = true;
            setTimeout(() => {
              if (!this.isMobileView) {
                this.drawer.open();
              }
            }, 0);

          }
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleAutoContraste() {
    this.theme = this.theme === THEME_AUTO_CONTRASTE ? THEME : THEME_AUTO_CONTRASTE;
  }


  ngOnInit(): void {
    this.isMobileView = (this.media.isActive('xs') || this.media.isActive('sm'));
    this.subscriptionMedia = this.media.subscribe((change: MediaChange) => {
      this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm');
    });
    this.changeTitleOnNavigationEnd();
    this.addLoadingOnRouterStartOrEnd();
  }

  /**
   * Verifica a mudanca de rota para adicionar um carregando
   */
  addLoadingOnRouterStartOrEnd(): void {
    this.router.events
      .filter((event) => event instanceof NavigationStart)
      .subscribe(() => {
        if (this.isMobileView && this.drawer) {
          this.drawer.close();
        }
        this.isLoadingRouter = true;
      });
    this.router.events
      .filter((event) => event instanceof NavigationEnd
        || event instanceof NavigationCancel
        || event instanceof NavigationError)
      .subscribe(() => {
        this.isLoadingRouter = false;
      });
  }

  /**
   * Altera o titulo para a rota destacada
   */
  changeTitleOnNavigationEnd(): void {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => this.titleService.setTitle(event['title'] ? this.defaultTitle + ' - ' + event['title'] : this.defaultTitle));
  }

  onLogout(): void {
    this.authService.logout();
  }

  displayLogin(): boolean {
    return AUTH_METHOD !== AUTH_METHOD_ENUM.NONE;
  }


}
