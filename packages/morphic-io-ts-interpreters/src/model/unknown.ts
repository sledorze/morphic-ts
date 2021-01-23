import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraUnknown } from '@morphic-ts/model-algebras/lib/unknown'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'

import { iotsApplyConfig } from '../config'
import { IOTSType, IoTsURI } from '../hkt'

declare module '@morphic-ts/model-algebras/lib/unknown' {
  /**
   *  @since 0.0.1
   */
  export interface UnknownConfig {
    [IoTsURI]: {
      type: t.Type<unknown>
    }
  }
}

/**
 *  @since 0.0.1
 */
export const ioTsUnknownInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnknown<IoTsURI, Env> => ({
    _F: IoTsURI,
    unknown: config => env => pipe(t.unknown, type => new IOTSType(iotsApplyConfig(config)(type, env, { type })))
  })
)
