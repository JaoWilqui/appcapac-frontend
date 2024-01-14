import { ICampaing } from '../../campaing/models/campaing.model';
import { ICategory } from '../../category/models/category.model';

export class IVideos {
  id?: number;

  descricao: string;

  link: string;

  nome: string;

  dtcadastro?: Date;

  category: ICategory;

  campaing: ICampaing;
}
