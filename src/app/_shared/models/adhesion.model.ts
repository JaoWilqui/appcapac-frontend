export enum AdhesionEnum {
  pf = 'PF',
  pme = 'PME',
}

export interface AdhesionOption {
  nome: string;
  value: AdhesionEnum;
}

export const adhesionOptions: AdhesionOption[] = [
  {
    nome: 'PF',
    value: AdhesionEnum.pf,
  },
  {
    nome: 'PME',
    value: AdhesionEnum.pme,
  },
];
