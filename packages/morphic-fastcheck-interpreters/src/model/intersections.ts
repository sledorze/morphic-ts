import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraIntersection } from '@morphic-ts/model-algebras/lib/intersections'
import { genericTuple } from 'fast-check'

import { FastCheckType, FastCheckURI } from '../hkt'
import { fastCheckApplyConfig } from './../config'

declare module '@morphic-ts/model-algebras/lib/intersections' {
  export interface IntersectionConfig<L extends readonly unknown[], A extends readonly unknown[]> {
    [FastCheckURI]: {
      arbs: IntersectionLA<L, A, FastCheckURI>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const fastCheckIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraIntersection<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    intersection: (...items) => (name, config) => env => {
      const arbs = items.map(getArb => getArb(env).arb)
      return new FastCheckType(
        fastCheckApplyConfig(config)(
          genericTuple(arbs).map(all => Object.assign({}, ...all)),
          env,
          {
            arbs
          } as any
        )
      )
    }
  })
)
