import * as t from 'io-ts'
import { IOTS2Type, IoTs2URI } from '..'
import { ModelAlgebraRecursive2 } from '../../model-algebras/recursive'

export const ioTs2RecursiveInterpreter: ModelAlgebraRecursive2<IoTs2URI> = {
  recursive: lazyA => new IOTS2Type(t.recursion(`recursive`, Self => lazyA(new IOTS2Type(Self)).type))
}
