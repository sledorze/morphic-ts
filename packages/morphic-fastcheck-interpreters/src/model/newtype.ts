import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraNewtype } from '@morphic-ts/model-algebras/lib/newtype'
import type { Arbitrary } from 'fast-check'
import { pipe } from 'fp-ts/lib/function'
import type { Some } from 'fp-ts/lib/Option'

import { fastCheckApplyConfig } from '../config'
import { FastCheckType, FastCheckURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/newtype' {
  export interface NewtypeConfig<L, A, N> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
  export interface IsoConfig<L, A, N> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
  export interface PrismConfig<L, A, N> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const fastCheckNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    newtype: () => (getArb, config) => env =>
      pipe(getArb(env).arb, arb => new FastCheckType(fastCheckApplyConfig(config?.conf)(arb, env, { arb }))),
    newtypeIso: (iso, getArb, config) => env =>
      pipe(
        getArb(env).arb,
        arb => new FastCheckType(fastCheckApplyConfig(config?.conf)(arb.map(iso.get), env, { arb }))
      ),
    newtypePrism: (prism, getArb, config) => env =>
      pipe(
        getArb(env).arb,
        arb =>
          new FastCheckType(
            fastCheckApplyConfig(config?.conf)(
              arb.filter(a => prism.getOption(a)._tag === 'Some').map(a => (prism.getOption(a) as Some<any>).value),
              env,
              { arb }
            )
          )
      )
  })
)
