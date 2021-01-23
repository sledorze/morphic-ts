import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraSet } from '@morphic-ts/model-algebras/lib/set'
import { pipe } from 'fp-ts/function'
import type { Type } from 'io-ts'
import { setFromArray } from 'io-ts-types/lib/setFromArray'

import { IOTSType, IoTsURI } from '../hkt'
import { iotsApplyConfig } from './../config'

declare module '@morphic-ts/model-algebras/lib/set' {
  /**
   *  @since 0.0.1
   */
  export interface SetConfig<L, A> {
    [IoTsURI]: {
      type: Type<A, L>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const ioTsSetInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraSet<IoTsURI, Env> => ({
    _F: IoTsURI,
    set: (a, ord, config) => env =>
      pipe(a(env).type, type => new IOTSType(iotsApplyConfig(config)(setFromArray(type, ord), env, { type })))
  })
)
