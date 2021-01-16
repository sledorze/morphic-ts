import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRefined } from '@morphic-ts/model-algebras/lib/refined'
import { pipe } from 'fp-ts/function'
import type { Ord } from 'fp-ts/lib/Ord'

import { ordApplyConfig } from '../config'
import { OrdType, OrdURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/refined' {
  /**
   *  @since 0.0.1
   */
  export interface RefinedConfig<E, A, B> {
    [OrdURI]: {
      ord: Ord<A>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface PredicateConfig<E, A> {
    [OrdURI]: {
      ord: Ord<A>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const ordRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined<OrdURI, Env> => ({
    _F: OrdURI,
    refined: (getOrd, _ref, _name, config) => env =>
      pipe(getOrd(env).ord, ord => new OrdType(ordApplyConfig(config)(ord, env, { ord }))),
    constrained: (getOrd, _ref, _name, config) => env =>
      pipe(getOrd(env).ord, ord => new OrdType(ordApplyConfig(config)(ord, env, { ord })))
  })
)
