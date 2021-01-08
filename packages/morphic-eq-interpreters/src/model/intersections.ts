import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraIntersection } from '@morphic-ts/model-algebras/lib/intersections'
import type { Array } from '@morphic-ts/model-algebras/lib/types'
import { fold, monoidAll } from 'fp-ts/Monoid'

import { EqType, EqURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const eqIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraIntersection<EqURI, Env> => ({
    _F: EqURI,
    intersection: <A>(types: Array<(env: Env) => EqType<A>>) => (env: Env) => {
      const equals = types.map(getEq => getEq(env).eq.equals)
      return new EqType<A>({
        equals: (a: A, b: A) => fold(monoidAll)(equals.map(eq => eq(a, b))) // TODO: optimize
      })
    }
  })
)
