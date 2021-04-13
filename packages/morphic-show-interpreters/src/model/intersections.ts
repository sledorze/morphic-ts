import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraIntersection } from '@morphic-ts/model-algebras/lib/intersections'

import { ShowType, ShowURI } from '../hkt'
import { showApplyConfig } from './../config'

declare module '@morphic-ts/model-algebras/lib/intersections' {
  export interface IntersectionConfig<L extends readonly unknown[], A extends readonly unknown[]> {
    [ShowURI]: {
      shows: IntersectionLA<L, A, ShowURI>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const showIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraIntersection<ShowURI, Env> => ({
    _F: ShowURI,
    intersection: (...types) => config => (env: Env) => {
      const shows = types.map(getShow => getShow(env).show)
      return new ShowType(
        showApplyConfig(config?.conf)(
          {
            show: a => shows.map(s => s.show(a)).join(' & ')
          },
          env,
          {
            shows
          } as any
        )
      )
    }
  })
)
