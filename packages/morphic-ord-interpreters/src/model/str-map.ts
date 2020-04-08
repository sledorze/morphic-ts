import { array, record } from 'fp-ts'
import { ord, ordString, getTupleOrd } from 'fp-ts/lib/Ord'
import { ModelAlgebraStrMap1 } from '@morphic-ts/model-algebras/lib/str-map'
import { OrdType, OrdURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const ordStrMapInterpreter: ModelAlgebraStrMap1<OrdURI> = {
  _F: OrdURI,
  // TODO: add customize
  strMap: getCodomain => _config => env =>
    new OrdType(ord.contramap(array.getOrd(getTupleOrd(ordString, getCodomain(env).ord)), record.toArray))
}
