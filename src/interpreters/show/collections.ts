import { record, set } from 'fp-ts'
import { ModelAlgebraCollection1 } from '../../algebras/collections'
import { ShowType, URI } from '.'

export const showCollectionInterpreter: ModelAlgebraCollection1<URI> = {
  set: ({ show }) => new ShowType(set.getShow(show)),
  strMap: codomain => new ShowType(record.getShow(codomain.show))
}
