import * as fc from 'fast-check'
import { FastCheckType, FastCheckURI } from '.'
import { ModelAlgebraIntersection1 } from '../../algebras/intersections'

export const fastCheckIntersectionInterpreter: ModelAlgebraIntersection1<FastCheckURI> = {
  intersection: <A>(items: FastCheckType<A>[]) =>
    new FastCheckType(fc.genericTuple(items.map(({ arb }) => arb)).map(all => Object.assign({}, ...all)))
}
