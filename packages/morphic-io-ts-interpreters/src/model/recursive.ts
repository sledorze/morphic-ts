import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraRecursive2 } from '@sledorze/morphic-model-algebras/lib/recursive'

export const ioTsRecursiveInterpreter: ModelAlgebraRecursive2<IoTsURI> = {
  _F: IoTsURI,
  recursive: lazyA => new IOTSType(t.recursion(`recursive`, Self => lazyA(new IOTSType(Self)).type))
}
