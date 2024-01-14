import { AdhesionEnum } from '../../../_shared/models/adhesion.model';
import { ICampaing } from '../../campaing/models/campaing.model';
import { ICategory } from '../../category/models/category.model';
import { IOperator } from '../../operators/models/operators.model';

export class IImages {
  id?: number;

  nome: string;

  descricao: string;

  imageRelativePath?: string;

  adesao: AdhesionEnum;

  operator: IOperator;

  category: ICategory;

  campaing: ICampaing;

  dtcadastro?: Date;
}
