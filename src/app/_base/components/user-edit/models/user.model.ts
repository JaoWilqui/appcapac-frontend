import { Company } from '../../../../modules/auth/models/profile';

export class IUser {
  id?: string;
  name: string;
  username: string;
  password: string;
  documentNumber: number;
  costCenter: number;
  telephone: number;
  email: string;
  role: Roles;
  status?: string;
  balance?: number;
  company?: Company;
}

export enum Roles {
  MASTER = 'MASTER',
  OWNER_CLIENT = 'OWNER_CLIENT',
  VIEWER = 'VIEWER',
  OPERATOR = 'OPERATOR',
  OWNER_PROVIDER = 'OWNER_PROVIDER',
}
