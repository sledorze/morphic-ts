import { record, set } from 'fp-ts'
import { ModelAlgebraCollection1 } from '../../algebras/collections'
import { EqType, URI } from '.'

export const eqCollectionInterpreter: ModelAlgebraCollection1<URI> = {
  set: ({ eq }) => new EqType(set.getEq(eq)),
  strMap: codomain => new EqType(record.getEq(codomain.eq))
}
