import { CampaingEnum } from './campaing.enum';

export class ICampaing {
  id?: number;

  nome: string;

  descricao: string;

  dtcadastro?: Date;

  dtinicio: Date;

  dtfim: Date;

  deletado?: string;

  status: CampaingEnum;
}
