import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraIntersection } from '@morphic-ts/model-algebras/lib/intersections'
import { fold, monoidAll } from 'fp-ts/Monoid'

import { EqType, EqURI } from '../hkt'
import { eqApplyConfig } from './../config'

declare module '@morphic-ts/model-algebras/lib/intersections' {
  export interface IntersectionConfig<L extends readonly unknown[], A extends readonly unknown[]> {
    [EqURI]: {
      equals: IntersectionLA<L, A, EqURI>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const eqIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraIntersection<EqURI, Env> => ({
    _F: EqURI,
    intersection: (...types) => (_name, config) => (env: Env) => {
      const equals = types.map(getEq => getEq(env).eq)
      return new EqType(
        eqApplyConfig(config)(
          {
            equals: (a, b) => fold(monoidAll)(equals.map(eq => eq.equals(a, b))) // TODO: optimize
          },
          env,
          {
            equals
          } as any
        )
      )
    }
  })
)
