import { Injectable } from '@angular/core';
import {
  IModules,
  ModulesEnum,
} from '../../../../_shared/models/modules.model';
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

@Injectable({ providedIn: 'root' })
export class AsideMenuService {
  menuLinks: MenuLink[] = [];
  PERMS_LIST: MenuObjectLiteral = {
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
  };

  MODULES_LITERAL: MenuObjectLiteral = {
    [ModulesEnum.imagens]: [
      { section: 'Imagens' },
      {
        label: 'Imagens',
        icon: 'account_circle',
        path: '/images',
      },
    ],
    [ModulesEnum.videos]: [
      { section: 'Videos' },
      {
        label: 'Videos',
        icon: 'play_circle_filled',
        path: '/videos',
      },
    ],
    [ModulesEnum.arquivos]: [
      { section: 'Arquivos' },
      {
        label: 'Arquivos',
        icon: 'account_circle',
        path: '/files',
      },
    ],
  };

  getListMenu(permission: string, modules?: IModules[]) {
    this.menuLinks = [];
    this.menuLinks = [...this.PERMS_LIST[permission]];
    if (modules?.length > 0) {
      modules.forEach((module) => {
        this.menuLinks.push(...this.MODULES_LITERAL[module.nome]);
      });
    }
    return this.menuLinks;
  }
}
