import { set } from 'fast-check'
import { FastCheckType, FastCheckURI } from '..'
import { fromArray } from 'fp-ts/lib/Set'
import { ModelAlgebraSet1 } from '@morphic/model-algebras/lib/set'

/**
 *  @since 0.0.1
 */
export const fastCheckSetInterpreter: ModelAlgebraSet1<FastCheckURI> = {
  _F: FastCheckURI,
  set: (a, ord) => new FastCheckType(set(a.arb).map(fromArray(ord)))
}
