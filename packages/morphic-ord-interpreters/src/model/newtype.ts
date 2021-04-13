import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { AnyNewtype, ModelAlgebraNewtype, NewtypeA } from '@morphic-ts/model-algebras/lib/newtype'
import { pipe } from 'fp-ts/lib/function'
import type { Ord } from 'fp-ts/lib/Ord'
import { fromCompare } from 'fp-ts/lib/Ord'

import { ordApplyConfig } from '../config'
import { OrdType, OrdURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/newtype' {
  export interface NewtypeConfig<L, A, N> {
    [OrdURI]: {
      ord: Ord<A>
    }
  }
  export interface IsoConfig<L, A, N> {
    [OrdURI]: {
      ord: Ord<A>
    }
  }
  export interface PrismConfig<L, A, N> {
    [OrdURI]: {
      ord: Ord<A>
    }
  }
}

const coerce = <N extends AnyNewtype>(e: Ord<NewtypeA<N>>): Ord<N> => e as Ord<N>
/**
 *  @since 0.0.1
 */
export const ordNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype<OrdURI, Env> => ({
    _F: OrdURI,
    newtype: () => (getOrd, config) => env =>
      pipe(getOrd(env).ord, ord => new OrdType(ordApplyConfig(config?.conf)(coerce(ord), env, { ord }))),
    newtypeIso: (iso, getOrd, config) => env =>
      pipe(
        getOrd(env).ord,
        ord =>
          new OrdType(
            ordApplyConfig(config?.conf)(
              fromCompare((a, b) => ord.compare(iso.reverseGet(a), iso.reverseGet(b))),
              env,
              { ord }
            )
          )
      ),
    newtypePrism: (prism, getOrd, config) => env =>
      pipe(
        getOrd(env).ord,
        ord =>
          new OrdType(
            ordApplyConfig(config?.conf)(
              fromCompare((a, b) => ord.compare(prism.reverseGet(a), prism.reverseGet(b))),
              env,
              { ord }
            )
          )
      )
  })
)
