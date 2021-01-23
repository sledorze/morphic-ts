import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRefined } from '@morphic-ts/model-algebras/lib/refined'
import type { Eq } from 'fp-ts/lib/Eq'
import { pipe } from 'fp-ts/lib/function'

import { eqApplyConfig } from '../config'
import { EqType, EqURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/refined' {
  /**
   *  @since 0.0.1
   */
  export interface RefinedConfig<E, A, B> {
    [EqURI]: {
      eq: Eq<A>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface PredicateConfig<E, A> {
    [EqURI]: {
      eq: Eq<A>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const eqRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined<EqURI, Env> => ({
    _F: EqURI,
    refined: (getEq, _ref, _name, config) => env =>
      pipe(getEq(env).eq, eq => new EqType(eqApplyConfig(config)(eq, env, { eq }))),
    constrained: (getEq, _ref, _name, config) => env =>
      pipe(getEq(env).eq, eq => new EqType(eqApplyConfig(config)(eq, env, { eq })))
  })
)
