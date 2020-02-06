import { array, record } from 'fp-ts'
import { ord, ordString, getTupleOrd } from 'fp-ts/lib/Ord'
import { ModelAlgebraStrMap1 } from '@morphic/model-algebras/lib/str-map'
import { OrdType, OrdURI } from '..'

/**
 *  @since 0.0.1
 */
export const ordStrMapInterpreter: ModelAlgebraStrMap1<OrdURI> = {
  _F: OrdURI,
  strMap: codomain => new OrdType(ord.contramap(array.getOrd(getTupleOrd(ordString, codomain.ord)), record.toArray))
}
