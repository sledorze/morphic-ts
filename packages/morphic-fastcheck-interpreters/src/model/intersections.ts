import { genericTuple } from 'fast-check'
import { FastCheckType, FastCheckURI } from '../hkt'
import { ModelAlgebraIntersection1 } from '@morphic-ts/model-algebras/lib/intersections'

/**
 *  @since 0.0.1
 */
export const fastCheckIntersectionInterpreter: ModelAlgebraIntersection1<FastCheckURI> = {
  _F: FastCheckURI,
  intersection: <A, R>(items: ((env: R) => FastCheckType<A>)[]) => (env: R) =>
    new FastCheckType(genericTuple(items.map(getArb => getArb(env).arb)).map(all => Object.assign({}, ...all)))
}
