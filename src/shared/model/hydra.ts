import { TimeStamps } from './timestamps';

export type CollectionResponse<Resource extends HydraMember> = {
  'hydra:member': Resource[];
  'hydra:totalItems': number;
  'hydra:view': { '@id': string; 'hydra:last': string };
  'hydra:search': unknown;
  'hydra:last': string;
};

export type Iri = string;

export type HydraMember = {
  '@id': Iri;
  id: string;
};

export type Dto<T> = Omit<T, keyof TimeStamps | keyof HydraMember> & {
  '@id'?: Iri;
  id: string;
};

export const extractId = (id = '') => {
  const parts = id.split('/');
  return parts[parts.length - 1];
};