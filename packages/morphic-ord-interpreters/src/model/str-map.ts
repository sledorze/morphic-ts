import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraStrMap } from '@morphic-ts/model-algebras/lib/str-map'
import { getOrd as AgetOrd } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import type { Ord } from 'fp-ts/Ord'
import { getTupleOrd, ord as ord_, ordString } from 'fp-ts/Ord'
import { toArray as RtoArray } from 'fp-ts/Record'

import { ordApplyConfig } from '../config'
import { OrdType, OrdURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/str-map' {
  /**
   *  @since 0.0.1
   */
  export interface StrMapConfig<L, A> {
    [OrdURI]: {
      ord: Ord<A>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface RecordConfig<LA, A, LB, B> {
    [OrdURI]: {
      domainOrd: Ord<A>
      codomainOrd: Ord<B>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const ordStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap<OrdURI, Env> => ({
    _F: OrdURI,
    strMap: (getCodomain, config) => env =>
      pipe(
        getCodomain(env).ord,
        ord =>
          new OrdType(
            ordApplyConfig(config?.conf)(ord_.contramap(AgetOrd(getTupleOrd(ordString, ord)), RtoArray), env, { ord })
          )
      ),
    record: (getDomain, getCodomain, config) => env =>
      ((domainOrd, codomainOrd) =>
        new OrdType(
          ordApplyConfig(config?.conf)(ord_.contramap(AgetOrd(getTupleOrd(domainOrd, codomainOrd)), RtoArray), env, {
            domainOrd,
            codomainOrd
          })
        ))(getDomain(env).ord, getCodomain(env).ord)
  })
)
