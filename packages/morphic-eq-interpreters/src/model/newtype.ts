import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { AnyNewtype, ModelAlgebraNewtype, NewtypeA } from '@morphic-ts/model-algebras/lib/newtype'
import type { Eq } from 'fp-ts/lib/Eq'
import { pipe } from 'fp-ts/lib/function'

import { eqApplyConfig } from '../config'
import { EqType, EqURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/newtype' {
  export interface NewtypeConfig<L, A, N> {
    [EqURI]: {
      eq: Eq<A>
    }
  }
  export interface IsoConfig<L, A, N> {
    [EqURI]: {
      eq: Eq<A>
    }
  }
  export interface PrismConfig<L, A, N> {
    [EqURI]: {
      eq: Eq<A>
    }
  }
}

const coerce = <N extends AnyNewtype>(e: Eq<NewtypeA<N>>): Eq<N> => e as Eq<N>
/**
 *  @since 0.0.1
 */
export const eqNewtypeInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraNewtype<EqURI, Env> => ({
    _F: EqURI,
    newtype: () => (getEq, config) => env =>
      pipe(coerce(getEq(env).eq), eq => new EqType(eqApplyConfig(config?.conf)(eq, env, { eq }))),
    newtypeIso: (iso, getEq, config) => env =>
      pipe(
        getEq(env).eq,
        eq =>
          new EqType(
            eqApplyConfig(config?.conf)(
              {
                equals: (y, x) => eq.equals(iso.reverseGet(y), iso.reverseGet(x))
              },
              env,
              { eq }
            )
          )
      ),
    newtypePrism: (prism, getEq, config) => env =>
      pipe(
        getEq(env).eq,
        eq =>
          new EqType(
            eqApplyConfig(config?.conf)(
              {
                equals: (y, x) => eq.equals(prism.reverseGet(y), prism.reverseGet(x))
              },
              env,
              { eq }
            )
          )
      )
  })
)
