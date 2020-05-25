import type { ModelAlgebraIntersection1 } from '@morphic-ts/model-algebras/lib/intersections'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { monoidAll, fold } from 'fp-ts/lib/Monoid'
import { EqType, EqURI } from '../hkt'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const eqIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraIntersection1<EqURI, Env> => ({
    _F: EqURI,
    intersection: <A>(types: ((env: Env) => EqType<A>)[]) => (env: Env) => {
      const equals = types.map(getEq => getEq(env).eq.equals)
      return new EqType<A>({
        equals: (a: A, b: A) => fold(monoidAll)(equals.map(eq => eq(a, b))) // TODO: optimize
      })
    }
  })
)
