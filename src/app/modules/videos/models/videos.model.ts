import { ICampaing } from '../../campaing/models/campaing.model';
import { IProduct } from '../../products/models/product.model';

export class IVideos {
  id?: number;

  descricao: string;

  link: string;

  nome: string;

  dtcadastro?: Date;

  product: IProduct;

  campaing: ICampaing;
}
