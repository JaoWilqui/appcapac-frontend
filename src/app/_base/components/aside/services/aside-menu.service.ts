import { Injectable } from '@angular/core';
import { PERMS } from '../../../../_shared/models/perms.enum';

export interface MenuLink {
  link?: string;
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
    { section: 'Administrativo' },
    {
      label: 'Clientes',
      link: '../assets/svgs/diversity_1.svg',
      path: '/clientes',
    },
  ],
  [PERMS.USER]: [
    { section: 'Cadastro' },
    {
      label: 'Usuarios',
      link: '../assets/svgs/diversity_1.svg',
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
