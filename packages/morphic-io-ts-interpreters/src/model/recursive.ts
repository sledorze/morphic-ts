import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRecursive } from '@morphic-ts/model-algebras/lib/recursive'
import * as t from 'io-ts'

import { IOTSType, IoTsURI } from '../hkt'
import { iotsApplyConfig } from './../config'

/**
 *  @since 0.0.1
 */
export const ioTsRecursiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRecursive<IoTsURI, Env> => ({
    _F: IoTsURI,
    recursive: (lazyA, _name, config) => env =>
      new IOTSType(
        iotsApplyConfig(config)(
          t.recursion(`recursive`, Self => lazyA(_ => new IOTSType(Self))(env).type),
          env,
          {}
        )
      )
  })
)
