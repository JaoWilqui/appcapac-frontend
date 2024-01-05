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

const MODULES_LITERAL: MenuObjectLiteral = {
  [ModulesEnum.imagens]: [
    { section: 'Imagens' },

    {
      label: 'Imagens',
      icon: 'account_circle',
      path: '/users',
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
      path: '/videos',
    },
  ],
};
@Injectable()
export class AsideMenuService {
  menuLinks: MenuLink[] = [];
  modulesList: MenuLink[] = [];
  getListMenu(permission: string, modules?: IModules[]) {
    modules.forEach((module) => {
      this.modulesList.push(...MODULES_LITERAL[module.nome]);
    });

    this.menuLinks = [...PERMS_LIST[permission], ...this.modulesList];
    console.log(this.menuLinks);
    return this.menuLinks;
  }
}
