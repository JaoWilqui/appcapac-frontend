import { AdhesionEnum } from '../../../_shared/models/adhesion.model';
import { ICampaing } from '../../campaing/models/campaing.model';
import { IOperator } from '../../operators/models/operators.model';
import { IProduct } from '../../products/models/product.model';

export class IImages {
  id?: number;

  nome: string;

  descricao: string;

  imageRelativePath?: string;

  adesao: AdhesionEnum;

  operator: IOperator;

  product: IProduct;

  campaing: ICampaing;

  dtcadastro?: Date;
}
