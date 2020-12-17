import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraStrMap2 } from '@morphic-ts/model-algebras/lib/str-map'
import * as t from 'io-ts'

import { iotsApplyConfig } from '../config'
import { IOTSType, IoTsURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const ioTsStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap2<IoTsURI, Env> => ({
    _F: IoTsURI,
    strMap: (codomain, config) => env =>
      new IOTSType(iotsApplyConfig(config)(t.record(t.string, codomain(env).type), env)),
    record: (domain, codomain, config) => env =>
      new IOTSType(iotsApplyConfig(config)(t.record(domain(env).type, codomain(env).type), env))
  })
)
