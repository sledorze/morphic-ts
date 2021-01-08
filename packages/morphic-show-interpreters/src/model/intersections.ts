import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraIntersection } from '@morphic-ts/model-algebras/lib/intersections'
import type { Array } from '@morphic-ts/model-algebras/lib/types'

import { ShowType, ShowURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const showIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraIntersection<ShowURI, Env> => ({
    _F: ShowURI,
    intersection: <A>(types: Array<(_: Env) => ShowType<A>>) => (env: Env) => {
      const shows = types.map(getShow => getShow(env).show.show)
      return new ShowType<A>({
        show: (a: A) => shows.map(s => s(a)).join(' & ')
      })
    }
  })
)
