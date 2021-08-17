import { Ref, UnwrapRef } from 'vue-demi'

export interface Field {
  name: string,
  key: string | number,
  type: 'string' | 'number' | 'date' | 'enum' | 'mail',
  disable?: boolean
  visiable?: boolean
  default?: any
}

export enum PageState {
  list = 'list',
  create = 'create',
  modify = 'modify'
}

export type EntityComposition<T = any> = {
  create: (ud: T) => Promise<T>,
  modify: (ud: T) => Promise<T>,
  remove: (ud: T) => Promise<T>,
  list: () => Promise<T[]>,
  query: any,
  fields: Field[],
  entities: Ref<UnwrapRef<T[]>>
}
