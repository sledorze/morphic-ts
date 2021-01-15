import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraIntersection } from '@morphic-ts/model-algebras/lib/intersections'
import type { Ord } from 'fp-ts/Ord'
import { getMonoid } from 'fp-ts/Ord'

import { OrdType, OrdURI } from '../hkt'
import { ordApplyConfig } from './../config'

const equalsOrd = <T>(): Ord<T> => ({
  equals: (_a: T, _b: T) => true,
  compare: (_a: T, _b: T) => 0
})

declare module '@morphic-ts/model-algebras/lib/intersections' {
  export interface IntersectionConfig<L extends readonly unknown[], A extends readonly unknown[]> {
    [OrdURI]: {
      ords: IntersectionLA<L, A, OrdURI>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const ordIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraIntersection<OrdURI, Env> => ({
    _F: OrdURI,
    intersection: (...types) => (_name, config) => env => {
      const { concat } = getMonoid<any>()
      const empty = equalsOrd()
      const ords = types.map(t => t(env).ord)
      const allOrd = ords.reduce(concat, empty)
      return new OrdType(
        ordApplyConfig(config)(allOrd, env, {
          ords
        } as any)
      )
    }
  })
)
