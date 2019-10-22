import { array, record } from 'fp-ts'
import { ord, ordString, getTupleOrd } from 'fp-ts/lib/Ord'
import { ModelAlgebraCollection1 } from '../../algebras/collections'
import { OrdType, URI } from '.'
import { toArray } from 'fp-ts/lib/Set'

export const ordCollectionInterpreter: ModelAlgebraCollection1<URI> = {
  set: (a, ordA) => new OrdType(ord.contramap(array.getOrd(a.ord), toArray(ordA))),
  strMap: codomain => new OrdType(ord.contramap(array.getOrd(getTupleOrd(ordString, codomain.ord)), record.toArray))
}
