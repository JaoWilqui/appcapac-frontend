import { Injectable } from '@angular/core';
import { PERMS } from '../../../../_shared/models/perms.enum';

export interface MenuLink {
  icon?: string;
  faIcon?: string;
  section?: string;
  svgIcon?: string;
  expanded?: boolean;
  label?: string;
  path?: string;
  exactMatch?: boolean;
  subItems?: MenuLink[];
}

export interface MenuObjectLiteral {
  [key: string]: MenuLink[];
}

const MODULES_LIST: MenuObjectLiteral = {
  [PERMS.ADMIN]: [
    { section: 'Admnistrativo' },
    {
      label: 'Usuários',
      icon: 'account_circle',
      path: '/users',
    },
  ],
  [PERMS.USER]: [
    { section: 'Cadastro' },
    {
      label: 'Usuarios',
      icon: '../assets/svgs/diversity_1.svg',
      path: '/usuarios',
    },
  ],
};
@Injectable({
  providedIn: 'root',
})
export class AsideMenuService {
  menuLinks: MenuLink[] = [];

  getListMenu(permission: string) {
    return MODULES_LIST[permission] || [];
  }
}
