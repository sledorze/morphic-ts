import { getMonoid } from 'fp-ts/Ord'
import type { Ord } from 'fp-ts/Ord'
import type { ModelAlgebraIntersection1 } from '@morphic-ts/model-algebras/lib/intersections'
import { OrdType, OrdURI } from '../hkt'
import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

const equalsOrd = <T>(): Ord<T> => ({
  equals: (_a: T, _b: T) => true,
  compare: (_a: T, _b: T) => 0
})

/**
 *  @since 0.0.1
 */
export const ordIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraIntersection1<OrdURI, Env> => ({
    _F: OrdURI,
    intersection: <A>(types: ((_: Env) => OrdType<A>)[]) => (env: Env) => {
      const { concat } = getMonoid<A>()
      const empty = equalsOrd<A>()
      return new OrdType<A>(types.map(t => t(env).ord).reduce(concat, empty))
    }
  })
)
