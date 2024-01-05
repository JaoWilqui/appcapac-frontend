import { ICampaing } from '../../campaing/models/campaing.model';
import { ICategory } from '../../category/models/category.model';

export class IVideos {
  id?: number;

  deletado?: string;

  descricao: string;

  link: string;

  nome: string;

  category: ICategory;

  campaing: ICampaing;
}
