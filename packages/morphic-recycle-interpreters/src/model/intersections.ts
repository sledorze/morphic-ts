import { ModelAlgebraIntersection1 } from '@morphic-ts/model-algebras/lib/intersections'
import { monoidAll, fold } from 'fp-ts/lib/Monoid'
import { RecycleType, RecycleURI } from '../hkt'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const recycleIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraIntersection1<RecycleURI, Env> => ({
    _F: RecycleURI,
    intersection: <A>(types: ((env: Env) => RecycleType<A>)[]) => (env: Env) => {
      const recycles = types.map(getRecycle => getRecycle(env).recycle.recycle)
      return new RecycleType<A>({
        recycle: (prev: A, next: A) =>
          fold(monoidAll)(recycles.map(recycle => recycle(prev, next) === prev)) ? prev : next // TODO: optimize
      })
    }
  })
)
