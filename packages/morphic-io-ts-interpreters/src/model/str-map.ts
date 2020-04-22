import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraStrMap2 } from '@morphic-ts/model-algebras/lib/str-map'
import { iotsApplyConfig } from '../config'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const ioTsStrMapInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraStrMap2<IoTsURI, Env> => ({
    _F: IoTsURI,
    strMap: codomain => env => new IOTSType(t.record(t.string, codomain(env).type)),
    strMapCfg: codomain => config => env =>
      new IOTSType(iotsApplyConfig(config)(t.record(t.string, codomain(env).type), env))
  })
)
