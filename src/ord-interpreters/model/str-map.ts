import { array, record } from 'fp-ts'
import { ord, ordString, getTupleOrd } from 'fp-ts/lib/Ord'
import { ModelAlgebraStrMap1 } from '../../model-algebras/str-map'
import { OrdType, OrdURI } from '..'

export const ordStrMapInterpreter: ModelAlgebraStrMap1<OrdURI> = {
  strMap: codomain => new OrdType(ord.contramap(array.getOrd(getTupleOrd(ordString, codomain.ord)), record.toArray))
}
