import { AdhesionEnum } from '../../../_shared/models/adhesion.model';
import { IProduct } from '../../products/models/product.model';

export class IVideos {
  id?: number;

  descricao: string;

  link: string;

  nome: string;

  adesao: AdhesionEnum;

  cidade: string;

  uf: string;

  dtcadastro?: Date;

  product: IProduct;

  // campaing: ICampaing;
}
