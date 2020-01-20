import * as t from 'io-ts'
import { IOTSStringType, IoTsStringURI } from '..'
import { ModelAlgebraRecursive2 } from '../../../model-algebras/recursive'

export const ioTsStringRecursiveInterpreter: ModelAlgebraRecursive2<IoTsStringURI> = {
  recursive: lazyA => new IOTSStringType(t.recursion(`recursive`, Self => lazyA(new IOTSStringType(Self)).type))
}
