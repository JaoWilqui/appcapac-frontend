import { ICampaing } from '../../campaing/models/campaing.model';
import { ICategory } from '../../category/models/category.model';

export class IImages {
  id?: number;

  nome: string;

  descricao: string;

  imageRelativePath?: string;

  category: ICategory;

  campaing: ICampaing;

  deletado?: string;

  dtcadastro?: Date;
}
