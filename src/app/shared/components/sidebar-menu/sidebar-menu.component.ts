import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/auth/auth.service';
import {AUTH_METHOD, AUTH_METHOD_ENUM} from '../../../app.constants';

declare function require(path: string);

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css'],
})
export class SidebarMenuComponent {

  @Input() system: string;
  /*@Input() clientName: string;*/
  @Input() systemVersion: string;
  imageSrc: string = require('../../../../../logo.png');

  navOptions: any = [
    {
      label: 'Inicio',
      routerLink: ['dashboard'],
      icon: 'home',
       role: 2
    },
    {
      label: 'Inicio',
      routerLink: ['dashboard'],
      icon: 'home',
      role: 1
    },

    {
      label: 'Meus Anúncios',
      routerLink: ['advertisement'],
      icon: 'format_list_bulleted',
       role: 1
    },
    {
      label: 'Meus Anúncios',
      routerLink: ['advertisement'],
      icon: 'format_list_bulleted',
      role: 2
    },

    {
      label: 'Cadastrar Anúncio',
      routerLink: ['/advertisement/add'],
      icon: 'add_shopping_cart',
      role: 2
    },
    {
      label: 'Cadastrar Anúncio',
      routerLink: ['/advertisement/add'],
      icon: 'add_shopping_cart',
      role: 1
    },

    {
      label: 'Gerenciamento de Anúncios',
      routerLink: ['advertisement-management'],
      icon: 'edit',
      role: 1
    },
    {
      label: 'Meu Cadastro',
      routerLink: ['users'],
      icon: 'person',
      role: 1
    },
      {
          label: 'Meu Cadastro',
          routerLink: ['users'],
          icon: 'group_add',
          role: 2
      }
  ];

  onLogout(): void {
    this.authService.logout();
  }

  displayLogin(): boolean {
    return AUTH_METHOD !== AUTH_METHOD_ENUM.NONE;
  }

  constructor(private router: Router, private authService: AuthService) {
  }

  getRoles() {
    return this.authService.getRoles();
  }

}
