import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraSet } from '@morphic-ts/model-algebras/lib/set'
import { pipe } from 'fp-ts/function'
import type { Show } from 'fp-ts/lib/Show'
import { getShow as SgetShow } from 'fp-ts/ReadonlySet'

import { ShowType, ShowURI } from '../hkt'
import { showApplyConfig } from './../config'

declare module '@morphic-ts/model-algebras/lib/set' {
  /**
   *  @since 0.0.1
   */
  export interface SetConfig<L, A> {
    [ShowURI]: {
      show: Show<A>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const showSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet<ShowURI, Env> => ({
    _F: ShowURI,
    set: (getShow, _ord, config) => env =>
      pipe(getShow(env).show, show => new ShowType(showApplyConfig(config)(SgetShow(show), env, { show })))
  })
)
