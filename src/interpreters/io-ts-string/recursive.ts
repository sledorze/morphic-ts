import * as t from 'io-ts'
import { IOTSStringType, URI } from '.'
import { ModelAlgebraRecursive2 } from '../../algebras/recursive'

export const ioTsStringRecursiveInterpreter: ModelAlgebraRecursive2<URI> = {
  recursive: lazyA =>
    new IOTSStringType(() => t.recursion(`recursive`, Self => lazyA(new IOTSStringType(() => Self)).type()))
}
