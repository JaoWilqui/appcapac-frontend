import { IFiles } from '../../files/models/files.model';
import { IImages } from '../../images/models/images.model';

export class IOperator {
  id?: number;

  nome: string;

  dtcadastro?: Date;

  images?: IImages[];

  files?: IFiles[];
}
