import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraStrMap } from '@morphic-ts/model-algebras/lib/str-map'
import { pipe } from 'fp-ts/function'
import type { Eq } from 'fp-ts/lib/Eq'
import { getEq as RgetEq } from 'fp-ts/Record'

import { eqApplyConfig } from '../config'
import { EqType, EqURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/str-map' {
  /**
   *  @since 0.0.1
   */
  export interface StrMapConfig<L, A> {
    [EqURI]: {
      eq: Eq<A>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface RecordConfig<LA, A, LB, B> {
    [EqURI]: {
      domainEq: Eq<A>
      codomainEq: Eq<B>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const eqStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap<EqURI, Env> => ({
    _F: EqURI,
    strMap: (getCodomain, config) => env =>
      pipe(getCodomain(env).eq, eq => new EqType(eqApplyConfig(config)(RgetEq(eq), env, { eq }))),
    record: (getDomain, getCodomain, config) => env =>
      // domain is always comparable (this is handled by record Eq)
      ((domainEq, codomainEq) => new EqType(eqApplyConfig(config)(RgetEq(codomainEq), env, { domainEq, codomainEq })))(
        getDomain(env).eq,
        getCodomain(env).eq
      )
  })
)
