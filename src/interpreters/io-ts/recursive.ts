import * as t from 'io-ts'
import { IOTSType, URI } from '.'
import { ModelAlgebraRecursive1 } from '../../algebras/recursive'

export const ioTsRecursiveInterpreter: ModelAlgebraRecursive1<URI> = {
  recursive: lazyA => new IOTSType(() => t.recursion(`recursive`, Self => lazyA(new IOTSType(() => Self)).type()))
}
