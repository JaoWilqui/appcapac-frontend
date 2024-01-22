import { AdhesionEnum } from '../../../_shared/models/adhesion.model';
import { IOperator } from '../../operators/models/operators.model';
import { IProduct } from '../../products/models/product.model';

export class IFiles {
  id?: number;

  nome: string;

  descricao: string;

  adesao: AdhesionEnum;

  operator: IOperator;

  dtcadastro?: Date;

  fileRelativePath: string;

  product: IProduct;

  tipo: string;
}
