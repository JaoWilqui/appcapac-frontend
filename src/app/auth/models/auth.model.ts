import { IModules } from '../../_shared/models/modules.model';

export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthRes {
  access_token: string;
}

export class IUserProfile {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  dtcadastro: Date;
  modules: IModules[];
  perms: string;
}
