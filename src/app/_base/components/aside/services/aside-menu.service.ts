import { Injectable } from '@angular/core';
import { IModules } from '../../../../_shared/models/modules.model';
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

const PERMS_LIST: MenuObjectLiteral = {
  [PERMS.ADMIN]: [
    { section: 'Admnistrativo' },
    {
      label: 'Usuários',
      icon: 'account_circle',
      path: '/users',
    },
    {
      label: 'Campanha',
      icon: 'account_circle',
      path: '/campaing',
    },
    {
      label: 'Categoria',
      icon: 'account_circle',
      path: '/category',
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

const MODULES_LITERAL = {
  [1]: [
    {
      label: 'Imagens',
      icon: 'account_circle',
      path: '/users',
    },
  ],
  [2]: [
    {
      label: 'Videos',
      icon: 'play_circle_filled',
      path: '/videos',
    },
  ],
  [3]: [
    {
      label: 'Arquivos',
      icon: 'account_circle',
      path: '/videos',
    },
  ],
};
@Injectable({
  providedIn: 'root',
})
export class AsideMenuService {
  menuLinks: MenuLink[] = [];

  getListMenu(permission: string, modules?: IModules[]) {
    if (modules.length > 0) {
      this.menuLinks = [...PERMS_LIST[permission], ...MODULES_LITERAL[2]];
    } else {
      this.menuLinks = PERMS_LIST[permission] || [];
    }

    return this.menuLinks;
  }
}
