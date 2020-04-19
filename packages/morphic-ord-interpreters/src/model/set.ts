import { array } from 'fp-ts'
import { ord } from 'fp-ts/lib/Ord'
import { ModelAlgebraSet1 } from '@morphic-ts/model-algebras/lib/set'
import { OrdType, OrdURI } from '../hkt'
import { toArray } from 'fp-ts/lib/Set'

/**
 *  @since 0.0.1
 */
export const ordSetInterpreter: ModelAlgebraSet1<OrdURI> = {
  _F: OrdURI,
  set: (getOrd, ordA) => env => new OrdType(ord.contramap(array.getOrd(getOrd(env).ord), toArray(ordA)))
}
