import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '../hkt'
import { ModelAlgebraRecursive2 } from '@morphic-ts/model-algebras/lib/recursive'
import { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'

/**
 *  @since 0.0.1
 */
export const ioTsRecursiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraRecursive2<IoTsURI, Env> => ({
    _F: IoTsURI,
    recursive: lazyA => env => new IOTSType(t.recursion(`recursive`, Self => lazyA(_ => new IOTSType(Self))(env).type))
  })
)
