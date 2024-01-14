import { AdhesionEnum } from '../../../_shared/models/adhesion.model';
import { ICategory } from '../../category/models/category.model';
import { IOperator } from '../../operators/models/operators.model';

export class IFiles {
  id?: number;

  nome: string;

  descricao: string;

  adesao: AdhesionEnum;

  operator: IOperator;

  dtcadastro?: Date;

  fileRelativePath: string;

  category: ICategory;

  tipo: string;
}
