import { array, record } from 'fp-ts'
import { ord, ordString, getTupleOrd } from 'fp-ts/lib/Ord'
import { ModelAlgebraStrMap1 } from '../../algebras/str-map'
import { OrdType, URI } from '.'

export const ordStrMapInterpreter: ModelAlgebraStrMap1<URI> = {
  strMap: codomain => new OrdType(ord.contramap(array.getOrd(getTupleOrd(ordString, codomain.ord)), record.toArray))
}
