import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraStrMap } from '@morphic-ts/model-algebras/lib/str-map'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'

import { iotsApplyConfig } from '../config'
import { IOTSType, IoTsURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/str-map' {
  /**
   *  @since 0.0.1
   */
  export interface StrMapConfig<L, A> {
    [IoTsURI]: {
      type: t.Type<A, L>
    }
  }

  /**
   *  @since 0.0.1
   */
  export interface RecordConfig<LA, A, LB, B> {
    [IoTsURI]: {
      domainType: t.Type<A, LA>
      codomainType: t.Type<B, LB>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const ioTsStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap<IoTsURI, Env> => ({
    _F: IoTsURI,
    strMap: (codomain, config) => env =>
      pipe(codomain(env).type, type => new IOTSType(iotsApplyConfig(config)(t.record(t.string, type), env, { type }))),
    record: (domain, codomain, config) => env =>
      ((domainType, codomainType) =>
        new IOTSType(iotsApplyConfig(config)(t.record(domainType, codomainType), env, { domainType, codomainType })))(
        domain(env).type,
        codomain(env).type
      )
  })
)
