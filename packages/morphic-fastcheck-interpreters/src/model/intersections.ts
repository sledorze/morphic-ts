import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraIntersection } from '@morphic-ts/model-algebras/lib/intersections'
import { genericTuple } from 'fast-check'

import { FastCheckType, FastCheckURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const fastCheckIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraIntersection<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    intersection: <A>(items: ((env: Env) => FastCheckType<A>)[]) => (env: Env) =>
      new FastCheckType(genericTuple(items.map(getArb => getArb(env).arb)).map(all => Object.assign({}, ...all)))
  })
)
