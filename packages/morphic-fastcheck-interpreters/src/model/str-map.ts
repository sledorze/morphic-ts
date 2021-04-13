import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraStrMap } from '@morphic-ts/model-algebras/lib/str-map'
import type { Arbitrary } from 'fast-check'
import { array as FCArray, string, tuple } from 'fast-check'
import { array } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { fromFoldable } from 'fp-ts/Record'
import { getFirstSemigroup } from 'fp-ts/Semigroup'

import { fastCheckApplyConfig } from '../config'
import { FastCheckType, FastCheckURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/str-map' {
  /**
   *  @since 0.0.1
   */
  export interface StrMapConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface RecordConfig<LA, A, LB, B> {
    [FastCheckURI]: {
      domainArb: Arbitrary<A>
      codomainArb: Arbitrary<B>
    }
  }
}

const strmapFromArray = <A>() => fromFoldable(getFirstSemigroup<A>(), array)
/**
 *  @since 0.0.1
 */
export const fastCheckStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    strMap: (codomain, config) => env =>
      pipe(
        codomain(env).arb,
        arb =>
          new FastCheckType(
            fastCheckApplyConfig(config?.conf)(FCArray(tuple(string(), arb)).map(strmapFromArray()), env, { arb })
          )
      ),
    record: (domain, codomain, config) => env =>
      ((domainArb, codomainArb) =>
        new FastCheckType(
          fastCheckApplyConfig(config?.conf)(FCArray(tuple(domainArb, codomainArb)).map(strmapFromArray()), env, {
            domainArb,
            codomainArb
          })
        ))(domain(env).arb, codomain(env).arb)
  })
)
