import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRefined } from '@morphic-ts/model-algebras/lib/refined'
import type { Arbitrary } from 'fast-check'
import { pipe } from 'fp-ts/lib/function'

import { fastCheckApplyConfig } from '../config'
import { FastCheckType, FastCheckURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/refined' {
  /**
   *  @since 0.0.1
   */
  export interface RefinedConfig<E, A, B> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface PredicateConfig<E, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const fastCheckRefinedInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRefined<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    refined: (getArb, ref, config) => env =>
      pipe(
        getArb(env).arb,
        arb => new FastCheckType(fastCheckApplyConfig(config?.conf)(arb.filter(ref), env, { arb }))
      ),
    constrained: (getArb, ref, config) => env =>
      pipe(
        getArb(env).arb,
        arb => new FastCheckType(fastCheckApplyConfig(config?.conf)(getArb(env).arb.filter(ref), env, { arb }))
      )
  })
)
