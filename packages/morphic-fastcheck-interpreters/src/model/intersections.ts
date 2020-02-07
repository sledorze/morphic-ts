import { genericTuple } from 'fast-check'
import { FastCheckType, FastCheckURI } from '..'
import { ModelAlgebraIntersection1 } from '@morphic-ts/model-algebras/lib/intersections'

/**
 *  @since 0.0.1
 */
export const fastCheckIntersectionInterpreter: ModelAlgebraIntersection1<FastCheckURI> = {
  _F: FastCheckURI,
  intersection: <A>(items: FastCheckType<A>[]) =>
    new FastCheckType(genericTuple(items.map(({ arb }) => arb)).map(all => Object.assign({}, ...all)))
}
