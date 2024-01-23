export enum AdhesionEnum {
  pf = 'PF/Adesão',
  pme = 'PME/Empresarial',
}

export interface AdhesionOption {
  nome: string;
  value: AdhesionEnum;
}

export const adhesionOptions: AdhesionOption[] = [
  {
    nome: 'PF/Adesão',
    value: AdhesionEnum.pf,
  },
  {
    nome: 'PME/Empresarial',
    value: AdhesionEnum.pme,
  },
];
