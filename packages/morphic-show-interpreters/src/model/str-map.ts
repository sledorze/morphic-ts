import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraStrMap } from '@morphic-ts/model-algebras/lib/str-map'
import { pipe } from 'fp-ts/function'
import type { Show } from 'fp-ts/lib/Show'
import { getShow as RgetShow } from 'fp-ts/Record'

import { showApplyConfig } from '../config'
import { ShowType, ShowURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/str-map' {
  /**
   *  @since 0.0.1
   */
  export interface StrMapConfig<L, A> {
    [ShowURI]: {
      show: Show<A>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface RecordConfig<LA, A, LB, B> {
    [ShowURI]: {
      domainShow: Show<A>
      codomainShow: Show<B>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const showStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap<ShowURI, Env> => ({
    _F: ShowURI,
    strMap: (codomain, config) => env =>
      pipe(codomain(env).show, show => new ShowType(showApplyConfig(config)(RgetShow(show), env, { show }))),
    record: (domain, codomain, config) => env =>
      ((domainShow, codomainShow) =>
        new ShowType(showApplyConfig(config)(RgetShow(codomainShow), env, { domainShow, codomainShow })))(
        domain(env).show,
        codomain(env).show
      )
  })
)
