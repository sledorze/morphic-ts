import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRefined } from '@morphic-ts/model-algebras/lib/refined'
import { pipe } from 'fp-ts/function'
import type { Show } from 'fp-ts/lib/Show'

import { showApplyConfig } from '../config'
import { ShowType, ShowURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/refined' {
  /**
   *  @since 0.0.1
   */
  export interface RefinedConfig<E, A, B> {
    [ShowURI]: {
      show: Show<A>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface PredicateConfig<E, A> {
    [ShowURI]: {
      show: Show<A>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const showRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined<ShowURI, Env> => ({
    _F: ShowURI,
    refined: (getShow, _ref, name, config) => env =>
      pipe(
        getShow(env).show,
        show => new ShowType({ show: x => `<${name}>(${showApplyConfig(config)(show, env, { show }).show(x)})` })
      ),
    constrained: (getShow, _ref, name, config) => env =>
      pipe(
        getShow(env).show,
        show => new ShowType({ show: x => `<${name}>(${showApplyConfig(config)(show, env, { show }).show(x)})` })
      )
  })
)
