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
      {
        label: 'Admnistrativo',
        expanded: false,
        icon: '../../assets/svgs/setting.svg',
        subItems: [
          {
            label: 'Usuários',
            path: '/users',
          },
        ],
      },

      {
        label: 'Gerenciamento',
        expanded: false,
        icon: '../../assets/svgs/chart.svg',
        subItems: [
          {
            label: 'Categoria',
            path: '/category',
          },
          {
            label: 'Campanha',
            path: '/campaing',
          },
        ],
      },
    ],
  };

  MODULES_LITERAL: MenuObjectLiteral = {
    [ModulesEnum.imagens]: [
      {
        label: 'Imagens',
        icon: '../../assets/svgs/image.svg',
        expanded: false,
        subItems: [
          {
            label: 'Imagens',
            path: '/images',
          },
        ],
      },
    ],
    [ModulesEnum.videos]: [
      {
        label: 'Videos',
        expanded: false,
        icon: '../../assets/svgs/video.svg',
        subItems: [
          {
            label: 'Videos',
            path: '/videos',
          },
        ],
      },
    ],
    [ModulesEnum.arquivos]: [
      {
        label: 'Arquivos',
        expanded: false,

        icon: '../../assets/svgs/file.svg',
        subItems: [
          {
            label: 'Arquivos',
            path: '/files',
          },
        ],
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
