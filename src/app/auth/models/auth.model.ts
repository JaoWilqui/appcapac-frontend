export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthRes {
  accessToken: string;
}

export class IUserProfile {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  dtcadastro: Date;
  // access: IAccess[];
  perms: string;
}
