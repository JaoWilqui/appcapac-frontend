import { ICategory } from '../../category/models/category.model';

export class IFiles {
  id?: number;

  nome: string;

  descricao: string;

  dtcadastro?: Date;

  fileRelativePath: string;

  category: ICategory;

  tipo: string;
}
