import * as t from 'io-ts'
import { IOTSType, IoTsURI } from '..'
import { ModelAlgebraRecursive1 } from '../../../model-algebras/recursive'

export const ioTsRecursiveInterpreter: ModelAlgebraRecursive1<IoTsURI> = {
  recursive: lazyA => new IOTSType(t.recursion(`recursive`, Self => lazyA(new IOTSType(Self)).type))
}
