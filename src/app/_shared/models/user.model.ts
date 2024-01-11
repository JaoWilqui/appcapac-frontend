import { IModules } from './modules.model';

export class User {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  senha: string;
  dtcadastro: Date;
  modules: number[] | IModules[];
  perms: string;
}
