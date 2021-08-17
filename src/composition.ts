import { ref } from 'vue-demi'
import { Field, EntityComposition } from './type'

export function useEntity<T = any> (opt: {
  createHandler: (entity: T) => Promise<T>,
  modifyHandler: (entity: T) => Promise<T>,
  listHandler: () => Promise<T[]>,
  removeHandler: (entity: T) => Promise<any | void>,
  fields: Field[],
  onCreated?: (entity: T) => void,
  onModified?: (entity: T) => void,
  onListed?: (entity: T[]) => void,
  onRemoved?: (entity: T) => void
}) : EntityComposition<T> {
  const { 
    createHandler, modifyHandler, listHandler, removeHandler,
    onCreated, onModified, onListed, onRemoved, 
    fields 
  } = opt
  const defaultQuery = () => fields.reduce((o, f) => {
    o[f.key] = f.default
  }, {} as any)
  const query = ref<any>(defaultQuery)
  const entities = ref<T[]>([])

  function create (ud: T) {
    return createHandler(ud)
    .then((ed) => {
      onCreated && onCreated(ed)
      query.value = defaultQuery
      listHandler()
      return ed
    })
  }

  function modify (ud: T) {
    return modifyHandler(ud)
    .then((ed) => {
      onModified && onModified(ed)
      query.value = defaultQuery
      listHandler()
      return ed
    })
  }

  function remove (ud: T) {
    return removeHandler(ud)
    .then((res) => {
      onRemoved && onRemoved(ud)
      return res
    })

  }

  function list () {
    return listHandler()
    .then((eds) => {
      onListed && onListed(eds)
      entities.value = eds as any
      return eds
    })
  }


  return {
    create,
    modify,
    remove,
    list,
    query,
    fields,
    entities,
  }

}