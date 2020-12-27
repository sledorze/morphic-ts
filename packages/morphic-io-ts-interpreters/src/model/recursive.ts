import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraRecursive } from '@morphic-ts/model-algebras/lib/recursive'
import * as t from 'io-ts'

import { IOTSType, IoTsURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const ioTsRecursiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRecursive<IoTsURI, Env> => ({
    _F: IoTsURI,
    recursive: lazyA => env => new IOTSType(t.recursion(`recursive`, Self => lazyA(_ => new IOTSType(Self))(env).type))
  })
)
