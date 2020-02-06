import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraRecursive2 } from '@morphic/model-algebras/lib/recursive'

/**
 *  @since 0.0.1
 */
export const ioTsRecursiveInterpreter: ModelAlgebraRecursive2<IoTsURI> = {
  _F: IoTsURI,
  recursive: lazyA => new IOTSType(t.recursion(`recursive`, Self => lazyA(new IOTSType(Self)).type))
}
